import { builder } from '~/server/graphql/builder';
import { useDatabase } from '#budgetdb';

const { db } = useDatabase();

const setBuilder = (pothos: typeof builder) => {
    pothos.queryField('getUser', (t) =>
        t.prismaField({
            nullable: true,
            type: 'User',
            resolve: async () => {
                return db.user.findFirst({
                    where: { id: 1 },
                });
            },
        }),
    );

    return pothos;
};

export default { setBuilder };
