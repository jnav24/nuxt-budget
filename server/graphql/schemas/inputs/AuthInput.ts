import { builder } from '~/server/graphql/builder';

export const LoginInput = builder.inputType('LoginInput', {
    fields: (t) => ({
        email: t.string({ required: true }),
        password: t.string({ required: true }),
        rememberMe: t.boolean(),
    }),
});
