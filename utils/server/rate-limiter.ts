import { unix } from '../timestamp';
import { useRedis } from '#budgetdb';

const { session, sessionRead } = useRedis();

const config = useRuntimeConfig();

const attempts = Number(config.RATELIMIT_ATTEMPTS);
const lockedSeconds = 300;

type RateLimiter = {
    attempts: number;
    locks: number;
    timestamp: number;
};

export const hasTooManyAttempts = async (key: string) => {
    const obj = await sessionRead.get(key);
    return !!obj && (JSON.parse(obj).attempts >= attempts || unix() < JSON.parse(obj).timestamp);
};

export const addAttempt = async (key: string) => {
    const obj = await sessionRead.get(key);

    let parseObj: RateLimiter = {
        attempts: 0,
        locks: 0,
        timestamp: 0,
    };

    if (obj) {
        parseObj = {
            ...parseObj,
            ...JSON.parse(obj),
        };
    }

    parseObj.attempts += 1;
    await session.set(key, JSON.stringify(parseObj));
};

export const clearAttempts = (key: string) => session.getdel(key);

export const lockAccount = async (key: string) => {
    const obj = await sessionRead.get(key);

    if (obj) {
        const parsed: RateLimiter = JSON.parse(obj);
        parsed.locks += 1;
        parsed.attempts = 0;
        parsed.timestamp = unix() + lockedSeconds * parsed.locks;
        await session.set(key, JSON.stringify(parsed));
    }
};

export const accountAvailableIn = async (key: string) => {
    const obj = await sessionRead.get(key);

    if (obj) {
        return JSON.parse(obj).timestamp - unix();
    }

    return lockedSeconds;
};
