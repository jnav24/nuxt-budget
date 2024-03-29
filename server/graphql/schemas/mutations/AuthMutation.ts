import { builder } from '~/server/graphql/builder';
import { useFormValidator } from '#budgetform';
import { ForgotPasswordInput, LoginInput } from '~/server/graphql/schemas/inputs/AuthInput';
import { authenticateUser, getUserByEmail, removeRememberMe } from '~/utils/server/authenticate';
import { removeAuthFromSession } from '~/utils/server/session';
import { UnauthorizedException } from '~/utils/exceptions';

const { validateRequest } = useFormValidator();

const setBuilder = (pothos: typeof builder) => {
    pothos.mutationField('forgotPassword', (t) =>
        t.field({
            skipTypeScopes: true,
            type: 'Auth',
            args: { input: t.arg({ type: ForgotPasswordInput, required: true }) },
            resolve: async (_parent, { input }, _context) => {
                validateRequest(input, { email: ['required', 'email'] });
                const user = await getUserByEmail(input.email);
                if (user) {
                    // add forgot passowrd to job queue
                }
                return { success: true };
            },
        }),
    );

    pothos.mutationField('logout', (t) =>
        t.field({
            type: 'Auth',
            resolve: async (_parent, _args, { event, session }, _info) => {
                const {
                    node: { req, res },
                } = event;

                if (!session) {
                    throw new UnauthorizedException('User is not logged in');
                }

                const { id, ...rest } = session;
                await removeRememberMe({ req, res });
                await removeAuthFromSession(id, rest);
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
