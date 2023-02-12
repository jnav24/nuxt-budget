import { builder } from '~/server/graphql/builder';

const setBuilder = (pothos: typeof builder) => {
    pothos.prismaObject('Users', {
        findUnique: (user) => ({ id: user.id }),
        fields: (t) => ({
            email: t.exposeString('email'),
        }),
    });

    return pothos;
};

export default { setBuilder };
