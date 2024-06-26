import { IncomingMessage, ServerResponse } from 'node:http';
import Cookies from 'cookies';
import { convertMinutesToMilliseconds } from '~/utils/timestamp';
import { ServerContext } from '~/server/graphql/builder';

const config = useRuntimeConfig();

type CookieOptions = {
    domain: string;
    httpOnly: boolean;
    maxAge?: number;
    path: string;
    sameSite: 'strict' | 'lax' | 'none' | true;
    secure: boolean;
};

const getExpiration = (minutes: number) => {
    const d = new Date();
    d.setTime(d.getTime() + convertMinutesToMilliseconds(minutes));
    return d;
};

export const getServerCookie = (ctx: ServerContext, name: string) => {
    const cookie = new Cookies(ctx.req, ctx.res);
    const value = cookie.get(name);
    const cookieHeader = ctx.req.headers.cookie;
    const cookieAuthorization = ctx.req.headers.authorization;

    if (!value && cookieAuthorization) {
        return (cookieAuthorization as string).split('Bearer ')[1];
    }

    if (!value && cookieHeader) {
        for (const c of cookieHeader.split('; ')) {
            const [cookieName, cookieValue] = c.split('=');
            if (cookieName.trim() === config.SESSION_NAME) {
                return cookieValue;
            }
        }
    }

    return value;
};

export const setServerCookie = (
    ctx: { req: IncomingMessage; res: ServerResponse },
    name: string,
    value: string,
    options: Partial<CookieOptions>,
) => {
    const cookie = new Cookies(ctx.req, ctx.res);
    const cookieOptions: CookieOptions & { expires: Date } = {
        domain: options.domain ?? '',
        expires: getExpiration(options.maxAge ?? 60),
        httpOnly: options.httpOnly ?? true,
        path: options.path ?? '/',
        sameSite: options.sameSite ?? true,
        secure: options.secure || config.APP_ENV === 'production',
    };
    cookie.set(name, value, cookieOptions);
};

export const deleteServerCookie = (ctx: ServerContext, name: string) => {
    const cookie = getServerCookie(ctx, name);

    if (cookie) {
        setServerCookie(ctx, name, cookie, { maxAge: -99999999 });
    }
};
