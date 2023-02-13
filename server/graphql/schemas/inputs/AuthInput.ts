import { builder } from '~/server/graphql/builder';

export const LoginInput = builder.inputType('LoginInput', {
    fields: (t) => ({
        email: t.string({}),
        password: t.string({}),
        remember_me: t.boolean(),
    }),
});
