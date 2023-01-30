import IORedis, { Redis } from 'ioredis';
import { PrismaClient as MySQLPrismaClient } from '@prisma/client';

const config = useRuntimeConfig();

// Ensure that there's only a single Prisma instance in dev. This is detailed here:
// https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
declare global {
    var __redis: Redis | undefined;
    var __redisRead: Redis | undefined;
    var __db: MySQLPrismaClient | undefined;
}

enum RedisDB {
    SESSION,
    JOBS,
    PUBLISHER,
    SUBSCRIBER,
}

const redisConfigTest = {
    read: {
        port: Number(config.REDIS_REPLICA_PORT),
        host: config.REDIS_HOST,
        family: 4,
        password: config.REDIS_PASSWORD,
    },
    write: {
        port: Number(config.REDIS_PRIMARY_PORT),
        host: config.REDIS_HOST,
        family: 4,
        password: config.REDIS_PASSWORD,
    },
};

const setDBClient = () => {
    if (process.env.APP_ENV === 'development') {
        const db = new MySQLPrismaClient({
            datasources: { db: { url: config.DB_URL } },
            log: ['query', 'warn', 'error'],
        });
        global.__db = db;
        return db;
    }

    return new MySQLPrismaClient({ datasources: { db: { url: config.DB_URL } } });
};

const setRedisClient = (configKey: keyof redisConfig, type: RedisDB, globalVar: string) => {
    const redis = new IORedis({
        ...redis.config[configKey],
        db: type,
    });
    global[globalVar] = redis;
    return redis;
};

export const db: MySQLPrismaClient = global.__db || setDBClient();
export const redis: Redis = global.__redis || setRedisClient('write', RedisDB.SESSION, '__redis');
export const redisRead: Redis =
    global.__redisRead || setRedisClient('read', RedisDB.SESSION, '__redisRead');
