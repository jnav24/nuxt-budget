import { builder } from '~/server/graphql/builder';

const setBuilder = (pothos: typeof builder) => {
    pothos.prismaObject('User', {
        findUnique: (user) => ({ id: user.id }),
        fields: (t) => ({
            id: t.exposeID('uuid'),
            email: t.exposeString('email'),
            isVerified: t.boolean({
                resolve: (user) => !!user.email_verified_at,
            }),
            profile: t.relation('UserProfile'),
            vehicles: t.relation('UserVehicle'),
        }),
    });

    return pothos;
};

export default { setBuilder };
