import { builder } from '~/server/graphql/builder';
import { useFormValidator } from '#budgetform';
import { ForgotPasswordInput, LoginInput } from '~/server/graphql/schemas/inputs/AuthInput';
import { authenticateUser, getUserByEmail, removeRememberMe } from '~/utils/server/authenticate';
import { removeSession } from '~/utils/server/session';

const { validateRequest } = useFormValidator();

const setBuilder = (pothos: typeof builder) => {
    pothos.mutationField('forgotPassword', (t) =>
        t.field({
            skipTypeScopes: true,
            type: 'Auth',
            args: { input: t.arg({ type: ForgotPasswordInput, required: true }) },
            resolve: (_parent, { input }, context) => {
                validateRequest(input, { email: ['required', 'email'] });
                const user = getUserByEmail(input.email);
                if (user) {
                    // add forgot passowrd to job queue
                }
                return { success: true };
            },
        }),
    );

    pothos.mutationField('logout', (t) =>
        t.field({
            skipTypeScopes: true,
            type: 'Auth',
            resolve: async (_parent, _args, { event }, _info) => {
                const {
                    node: { req, res },
                } = event;
                await removeRememberMe({ req, res });
                await removeSession({ req, res });
                return { success: true };
            },
        }),
    );

    pothos.mutationField('login', (t) =>
        t.field({
            skipTypeScopes: true,
            type: 'Auth',
            args: { input: t.arg({ type: LoginInput, required: true }) },
            resolve: async (_parent, { input }, context) => {
                validateRequest(input, { email: ['required', 'email'], password: ['required'] });
                await authenticateUser(input, context);
                return { mfa: false, success: true };
            },
        }),
    );

    pothos.mutationField('register', (t) =>
        t.field({
            skipTypeScopes: true,
            type: 'Auth',
            args: {},
            resolve: () => {
                return { success: true };
            },
        }),
    );

    return pothos;
};

export default { setBuilder };
