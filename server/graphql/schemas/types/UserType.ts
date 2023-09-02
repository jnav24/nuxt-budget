import { builder } from '~/server/graphql/builder';

const setBuilder = (pothos: typeof builder) => {
    pothos.prismaObject('User', {
        findUnique: (user) => ({ id: user.id }),
        fields: (t) => ({
            id: t.exposeString('uuid'),
            email: t.exposeString('email'),
        }),
    });

    return pothos;
};

export default { setBuilder };
