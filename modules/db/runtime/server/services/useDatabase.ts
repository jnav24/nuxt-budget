import { PrismaClient as MySQLPrismaClient } from '@prisma/client';

const config = useRuntimeConfig();

const setDatabase = () => {
    if (config.APP_ENV === 'development') {
        const db = new MySQLPrismaClient({
            datasources: { db: { url: config.DB_URL } },
            log: ['query', 'warn', 'error'],
        });

        return db;
    }

    return new MySQLPrismaClient({ datasources: { db: { url: config.DB_URL } } });
};

export const useDatabase = () => ({
    db: setDatabase(),
});
