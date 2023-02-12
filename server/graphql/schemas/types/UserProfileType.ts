import { builder } from '~/server/graphql/builder';

const setBuilder = (pothos: typeof builder) => {
    pothos.prismaObject('UserProfile', {
        findUnique: (profile) => ({ id: profile.id }),
        fields: (t) => ({
            firstName: t.exposeString('first_name'),
        }),
    });

    return pothos;
};

export default { setBuilder };
