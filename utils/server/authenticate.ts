import type { IncomingMessage, ServerResponse } from 'node:http';
import { getClientIp } from 'request-ip';
import { User } from '@prisma/client';
import { TooManyRequestsException, UnauthorizedException } from '../exceptions';
import { getErrorMessage } from '../common';
import { error } from '../logger';
import { unix } from '../timestamp';
import { LoginInput } from '../../server/graphql/generated/types';
import type { Context } from '../../server/graphql/builder';
import { ServerContext } from '../../server/graphql/builder';
import { decryptAES, encryptWithAES, hashWithSha256, verifyPassword } from './encryption';
import {
    accountAvailableIn,
    addAttempt,
    clearAttempts,
    hasTooManyAttempts,
    lockAccount,
} from './rate-limiter';
import { deleteServerCookie, getServerCookie, setServerCookie } from './cookies';
import { setUserInSession } from './session';
import { useDatabase } from '#budgetdb';

const { db } = useDatabase();

const config = useRuntimeConfig();

const REMEMBER_TOKEN = `${config.SESSION_NAME}_remember_me`;

const ensureIsNotRateLimited = async (key: string) => {
    if (await hasTooManyAttempts(key)) {
        await lockAccount(key);
        const seconds = await accountAvailableIn(key);
        throw new TooManyRequestsException(
            `There were too many attempts to login. Account is locked for ${Math.ceil(
                seconds / 60,
            )} minutes`,
        );
    }
};

const setRememberMe = async (
    shouldRemember: boolean,
    email: string,
    key: string,
    context: { req: IncomingMessage; res: ServerResponse },
) => {
    try {
        if (shouldRemember) {
            const hash = hashWithSha256(`${key}|${unix()}`);
            await db.user.update({
                where: { email },
                data: { remember_token: hash },
            });
            const tokenObj = {
                email,
                hash,
            };

            setServerCookie(context, REMEMBER_TOKEN, encryptWithAES(JSON.stringify(tokenObj)), {
                maxAge: 43000,
            });
        }
    } catch (err) {
        error(`Remember me token: ${getErrorMessage(err)}`);
    }
};

export const getUserByEmail = (email: string): Promise<null | User> => {
    return db.user.findFirst({
        where: {
            email: {
                equals: email,
            },
        },
    });
};

const verifyUser = async (key: string, password: string, user: User | null) => {
    if (!user || !verifyPassword(password, user.password)) {
        await addAttempt(key);
        throw new UnauthorizedException('Username and/or password are incorrect');
    }
};

export const authenticateUser = async (
    { email, password, rememberMe }: LoginInput,
    { event }: Context,
) => {
    const {
        node: { req, res },
    } = event;
    const key = `${email}|${getClientIp(req)}`;
    await ensureIsNotRateLimited(key);
    const user = await getUserByEmail(email as string);
    await verifyUser(key, password, user);
    await setRememberMe(rememberMe as boolean, email as string, key, { req, res });
    await clearAttempts(key);
    await setUserInSession(
        { req, res },
        { uuid: user!.uuid, activated_at: user!.email_verified_at },
    );
};

export const registerUser = async () => {};

export const getUserFromRememberMeToken = async () => {};

export const removeRememberMe = async (ctx: ServerContext) => {
    try {
        const cookie = getServerCookie(ctx, REMEMBER_TOKEN);

        if (cookie) {
            const decryptToken = JSON.parse(decryptAES(cookie));

            const user = await db.user.findFirstOrThrow({
                where: { email: decryptToken.email },
            });

            if (user.remember_token === decryptToken.hash) {
                db.user.update({
                    where: { email: decryptToken.email },
                    data: { remember_token: null },
                });
            }

            deleteServerCookie(ctx, REMEMBER_TOKEN);
        }
    } catch (err) {
        error(`Remove remember me:: ${getErrorMessage(err)}`);
    }
};

export const changeUserPassword = async () => {};
