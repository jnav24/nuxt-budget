import { builder } from '~/server/graphql/builder';

const setBuilder = (pothos: typeof builder) => {
    pothos.prismaObject('UserProfile', {
        findUnique: (profile) => ({ id: profile.id }),
        fields: (t) => ({
            id: t.exposeID('uuid'),
            firstName: t.exposeString('first_name'),
            lastName: t.exposeString('last_name'),
            image: t.exposeString('image'),
        }),
    });

    return pothos;
};

export default { setBuilder };
