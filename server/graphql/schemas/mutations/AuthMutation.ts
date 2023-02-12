import { builder } from '~/server/graphql/builder';

const setBuilder = (pothos: typeof builder) => {
    pothos.mutationField('logout', (t) =>
        t.field({
            skipTypeScopes: true,
            type: 'Auth',
            nullable: true,
            resolve: async (_parent, _args, { req, res }, _info) => {
                // await removeRememberMe({ req, res });
                // await removeSession(req);
                return { success: true };
            },
        }),
    );

    return pothos;
};

export default { setBuilder };
