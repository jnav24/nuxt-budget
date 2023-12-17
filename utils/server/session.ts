import { IncomingMessage } from 'node:http';
import { getClientIp } from 'request-ip';
import { EventHandlerRequest, H3Event } from 'h3';
import { User, UserProfile } from '@prisma/client';
import { ServerContext } from '~/server/graphql/builder';
import { decryptAES, encryptWithAES, hashWithSha256 } from '~/utils/server/encryption';
import { convertMinutesToSeconds, unix } from '~/utils/timestamp';
import { randomString } from '~/utils/common';
import { error } from '~/utils/logger';
import { useRedis } from '#budgetdb';
import { deleteServerCookie, getServerCookie, setServerCookie } from '~/utils/server/cookies';

const config = useRuntimeConfig();
const { session, sessionRead } = useRedis();

export type BudgetCookie = { id: string };
export type BudgetSessionAuth = {
    id: bigint;
    uid: string;
    avatar: string | null;
    first_name: string;
    last_name: string;
    expires_at: number;
    activated_at: Date | null;
};
type BudgetSession = {
    flash: {
        error: string[];
        success: string[];
    };
    path: {
        current: string;
        previous: string;
    };
    auth?: BudgetSessionAuth;
};

const expirationInMinutes = Number(config.SESSION_EXPIRATION);
const expirationInSeconds = convertMinutesToSeconds(expirationInMinutes);

const generateSessionId = (req: IncomingMessage) => {
    const rand = randomString(Math.floor(Math.random() * 100));
    return hashWithSha256(`${rand}|${getClientIp(req)}|${unix()}`);
};

export const getCurrentSession = async (
    ctx: ServerContext,
): Promise<null | (BudgetSession & BudgetCookie)> => {
    const cookie = getServerCookie(ctx, config.SESSION_NAME);

    if (!cookie) {
        return null;
    }

    const dCookie = JSON.parse(decryptAES(cookie)) as BudgetCookie;

    if (!dCookie.id) {
        return null;
    }

    const obj = await sessionRead.get(dCookie.id);

    if (!obj) {
        return null;
    }

    return { id: dCookie.id, ...JSON.parse(obj) };
};

const stringify = <T extends Record<string, any>>(data: T) => {
    return JSON.stringify(data, (_, v) => {
        return typeof v === 'bigint' ? v.toString() : v;
    });
};

const updateSession = async (sessionId: string, data: BudgetSession) => {
    const ttl = await session.ttl(sessionId);
    await session.setex(sessionId, ttl === -1 ? expirationInSeconds : ttl, stringify(data));
};

export const isExpired = (timestamp: number) => unix() > timestamp;

const updateCurrentPath = (
    event: H3Event<EventHandlerRequest>,
    data: BudgetSession,
): BudgetSession => {
    data.path.previous = data.path.current;
    data.path.current = getRequestURL(event).pathname;
    return data;
};

export const removeAuthFromSession = async (sessionId: string, data: BudgetSession) => {
    data.auth = undefined;
    await updateSession(sessionId, data);
};

export const removeSession = async (ctx: ServerContext) => {
    const cookie = await getCurrentSession(ctx);

    if (cookie) {
        await session.getdel(cookie.id);
    }

    deleteServerCookie(ctx, config.SESSION_NAME);
};

const setNewSession = async (event: H3Event<EventHandlerRequest>) => {
    const sessionId = generateSessionId(event.node.req);

    const data: BudgetSession = {
        flash: { error: [], success: [] },
        path: {
            current: getRequestURL(event).pathname ?? setPreviousPath(event.node.req),
            previous: '',
        },
    };

    await session.setex(sessionId, expirationInSeconds, JSON.stringify(data));

    setServerCookie(
        { req: event.node.req, res: event.node.res },
        config.SESSION_NAME,
        encryptWithAES(JSON.stringify({ id: sessionId })),
        {
            maxAge: expirationInMinutes,
        },
    );
};

export const setPreviousPath = (req: IncomingMessage) => {
    if (req.headers?.referer && req.headers?.referer.includes(config.APP_ENV)) {
        const split = (req.headers?.referer ?? '').split(config.APP_ENV);
        const path = split[split.length - 1];
        return path.charAt(0) === '/' ? path : `/${path}`;
    }

    return '/auth/login';
};

export const createSession = async (event: H3Event<EventHandlerRequest>) => {
    const currentSession = await getCurrentSession({ req: event.node.req, res: event.node.res });

    if (currentSession?.id) {
        return null;
    }

    await setNewSession(event);
};

export const setUserInSession = async (ctx: ServerContext, user: User) => {
    // @todo pass the event to this function from GraphQL and uncomment line below
    // await createSession(ctx);

    const obj = await getCurrentSession(ctx);

    if (!obj) {
        error(`Set User Session Error :: Unexpected error retrieving session`);
        return null;
    }

    const { id, ...data } = obj;
    const profile = (user as User & { UserProfile: UserProfile }).UserProfile;
    data.auth = {
        id: user.id,
        uid: user.uuid,
        expires_at: unix() + convertMinutesToSeconds(Number(config.AUTH_EXPIRATION)),
        first_name: profile.first_name,
        last_name: profile.last_name,
        avatar: profile.image,
        activated_at: user.email_verified_at,
    };
    await updateSession(id, data);
};

export const setSessionPath = async (event: H3Event<EventHandlerRequest>) => {
    const { req, res } = event.node;
    const currentSession = await getCurrentSession({ req, res });

    if (currentSession && currentSession.path) {
        const { id, ...rest } = currentSession;
        await updateSession(id, updateCurrentPath(event, rest));
    }
};
