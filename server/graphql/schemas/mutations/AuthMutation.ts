import { builder } from '~/server/graphql/builder';
import { useDatabase } from '#budgetdb';
import { useFormValidator } from '#budgetform';
import { LoginInput } from '~/server/graphql/schemas/inputs/AuthInput';
import { authenticateUser } from '~/utils/server/authenticate';

const { db } = useDatabase();
const { validateRequest } = useFormValidator();

const setBuilder = (pothos: typeof builder) => {
    pothos.mutationField('logout', (t) =>
        t.field({
            skipTypeScopes: true,
            type: 'Auth',
            nullable: true,
            resolve: async (_parent, _args, _context, _info) => {
                // await removeRememberMe({ req, res });
                // await removeSession(req);
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
