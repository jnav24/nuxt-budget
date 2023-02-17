import { PrismaClient as MySQLPrismaClient } from '@prisma/client';

const config = useRuntimeConfig();

declare global {
    var __db: MySQLPrismaClient | undefined;
}

const setDatabase = () => {
    const db = new MySQLPrismaClient({
        datasources: { db: { url: config.DB_URL } },
        log: config.APP_ENV === 'development' ? ['query', 'warn', 'error'] : undefined,
    });

    global.__db = db;
    return db;
};

export const useDatabase = () => ({
    db: global.__db || setDatabase(),
});
