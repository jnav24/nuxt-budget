import IORedis from 'ioredis';

const config = useRuntimeConfig();

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
    return new IORedis({
        ...redisConfig[configKey],
        db: type,
    });
};

export const useRedis = () => ({
    session: setRedisClient('primary', RedisDB.SESSION),
    sessionReplica: setRedisClient('replica1', RedisDB.SESSION),
});
