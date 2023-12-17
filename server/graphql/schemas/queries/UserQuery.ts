import { builder } from '~/server/graphql/builder';
import { useDatabase } from '#budgetdb';

const { db } = useDatabase();

const setBuilder = (pothos: typeof builder) => {
    pothos.queryField('getUser', (t) =>
        t.prismaField({
            nullable: true,
            type: 'User',
            resolve: (_query, _parent, _args, { user }, _info) => {
                return db.user.findFirst({
                    where: { id: BigInt(user!.id) },
                });
            },
        }),
    );

    return pothos;
};

export default { setBuilder };
