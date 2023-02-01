import SchemaBuilder from '@pothos/core';
import ScopeAuthPlugin from '@pothos/plugin-scope-auth';
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects';
import PrismaPlugin from '@pothos/plugin-prisma';
import { IncomingMessage, ServerResponse } from 'http';
import { UnauthorizedException } from '~/utils/exceptions';
import { db } from '~/utils/db-connection';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import { Auth, Base } from '~/graphql/generated/types';

export type Context = {
    req: IncomingMessage;
    res: ServerResponse;
    session?: any | null;
    // user?: Pick<User, 'id' | 'pk' | 'email'>;
};

export async function createGraphQLContext(
    req: IncomingMessage,
    res: ServerResponse,
): Promise<Context> {
    return {
        req,
        res,
        // session: req.session,
        // user: await resolveContext({ req, res }),
    };
}

type SchemaBuilderType = {
    AuthScopes: {
        auth: boolean;
        public: boolean;
    };
    Context: Context;
    Objects: {
        Auth: Auth;
        Base: Base;
    };
    PrismaTypes: PrismaTypes;
    Scalars: {
        ID: { Input: string; Output: string | number };
        DateTime: { Input: Date; Output: Date };
    };
};

export const builder = new SchemaBuilder<SchemaBuilderType>({
    plugins: [ScopeAuthPlugin, SimpleObjectsPlugin, PrismaPlugin],
    prisma: {
        client: db,
    },
    scopeAuthOptions: {
        unauthorizedError: () => new UnauthorizedException('Not Authorized'),
    },
    authScopes: async (ctx) => {
        return {
            auth: true,
            public: false,
        };
    },
});

builder.queryType({ authScopes: { auth: true } });

builder.mutationType({ authScopes: { auth: true } });

builder.scalarType('DateTime', {
    serialize: (date) => {
        return date.toISOString();
    },
    parseValue: (date) => {
        if (typeof date !== 'string') {
            throw new Error('Unknown date value.');
        }

        return new Date(date);
    },
});
