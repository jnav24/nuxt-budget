import { IncomingMessage, ServerResponse } from 'http';
import SchemaBuilder from '@pothos/core';
import ScopeAuthPlugin from '@pothos/plugin-scope-auth';
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects';
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import { EventHandlerRequest, H3Event } from 'h3';
import { UnauthorizedException } from '~/utils/exceptions';
import { useDatabase } from '#budgetdb';
import { Auth, Base, User } from '~/server/graphql/generated/types';
import { BudgetContext, getCurrentSession } from '~/utils/server/session';

const { db } = useDatabase();

export type ServerContext = {
    req: IncomingMessage;
    res: ServerResponse;
};

export type Context = {
    event: H3Event<EventHandlerRequest>;
    session?: BudgetContext | null;
    user: Pick<User, 'id' | 'email'> | null;
};

export async function createGraphQLContext(event: H3Event<EventHandlerRequest>): Promise<Context> {
    const currentSession = await getCurrentSession({ req: event.node.req, res: event.node.res });
    let user = null;

    if (currentSession && currentSession.auth?.uid) {
        user = (await db.user.findFirst({
            where: {
                NOT: [
                    {
                        email_verified_at: null,
                    },
                ],
                AND: [
                    {
                        uuid: currentSession.auth.uid,
                    },
                ],
            },
            select: {
                id: true,
                email: true,
            },
        })) as Pick<User, 'id' | 'email'> | null;
    }

    return {
        event,
        session: currentSession,
        user,
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
    authScopes: ({ user }) => {
        return {
            auth: !!user,
            public: !user,
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
            throw new TypeError('Unknown date value.');
        }

        return new Date(date);
    },
});
