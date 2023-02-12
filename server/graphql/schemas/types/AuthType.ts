import { builder } from '~/server/graphql/builder';

const setBuilder = (pothos: typeof builder) => {
    pothos.objectType('Auth', {
        fields: (t) => ({
            mfa: t.exposeBoolean('mfa', { nullable: true }),
            success: t.exposeBoolean('success', { nullable: true }),
        }),
    });

    pothos.objectType('Base', {
        fields: (t) => ({
            success: t.exposeBoolean('success', { nullable: true }),
        }),
    });

    return pothos;
};

export default { setBuilder };
