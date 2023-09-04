import { createYoga } from 'graphql-yoga';
import { createGraphQLContext } from '~/server/graphql/builder';
import { H3Event } from 'h3';
import { GraphQLRequest, isDevelopment, shouldRenderGraphiQL } from '~/server/graphql/utils';
import { schema } from '~/server/graphql/server';

export default defineEventHandler((event) => {
    const server = createYoga<H3Event>({
        context: ({ node: { req, res } }) => createGraphQLContext(req, res),
        graphqlEndpoint: '/api',
        graphiql: (request) => shouldRenderGraphiQL(request as GraphQLRequest),
        maskedErrors: isDevelopment,
        schema,
    });
    return server.handle(event.req, event.res);
});
