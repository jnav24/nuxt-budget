import { builder } from '~/server/graphql/builder';

const setBuilder = (pothos: typeof builder) => {
    pothos.prismaObject('User', {
        findUnique: (user) => ({ id: user.id }),
        fields: (t) => ({
            id: t.exposeID('uuid'),
            email: t.exposeString('email'),
            emailVerifiedAt: t.expose('email_verified_at', { nullable: true, type: 'DateTime' }),
            rememberToken: t.exposeString('remember_token'),
            profile: t.relation('UserProfile'),
            vehicles: t.relation('UserVehicle'),
        }),
    });

    return pothos;
};

export default { setBuilder };
