import IORedis, { Redis } from 'ioredis';

const config = useRuntimeConfig();

declare global {
    var __primary: Redis | undefined;
    var __replica1: Redis | undefined;
}

enum RedisDB {
    SESSION,
    JOBS,
    PUBLISHER,
    SUBSCRIBER,
}

type RedisOptions = {
    port: number;
    host: string;
    family: number;
    password: string;
};

type RedisConfig = {
    replica1: RedisOptions;
    primary: RedisOptions;
};

const redisConfig: RedisConfig = {
    replica1: {
        port: Number(config.REDIS_REPLICA_PORT),
        host: config.REDIS_HOST,
        family: 4,
        password: config.REDIS_PASSWORD,
    },
    primary: {
        port: Number(config.REDIS_PRIMARY_PORT),
        host: config.REDIS_HOST,
        family: 4,
        password: config.REDIS_PASSWORD,
    },
};

const setRedisClient = (configKey: keyof RedisConfig, type: RedisDB) => {
    const redis = new IORedis({
        ...redisConfig[configKey],
        db: type,
    });

    (global as any)[`__${configKey}`] = redis;
    return redis;
};

export const useRedis = () => ({
    session: global.__primary || setRedisClient('primary', RedisDB.SESSION),
    sessionReplica: global.__replica1 || setRedisClient('replica1', RedisDB.SESSION),
});
