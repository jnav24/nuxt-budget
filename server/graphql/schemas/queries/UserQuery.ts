import { builder } from '~/server/graphql/builder';
import { db } from '~/utils/db-connection';

const setBuilder = (pothos: typeof builder) => {
    pothos.queryField('getUser', (t) =>
        t.prismaField({
            nullable: true,
            type: 'Users',
            resolve: async () => {
                return db.users.findFirst({
                    rejectOnNotFound: true,
                    where: { id: 1 },
                });
            },
        }),
    );

    return pothos;
};

export default { setBuilder };
