import { createYoga } from 'graphql-yoga';
import { createGraphQLContext } from '~/graphql/builder';
import { H3Event } from 'h3';
import { GraphQLRequest, isDevelopment, shouldRenderGraphiQL } from '~/utils/graphql';
import { schema } from '~/graphql/server';

export default defineEventHandler((event) => {
    const server = createYoga<H3Event>({
        context: ({ req, res }) => createGraphQLContext(req, res),
        graphqlEndpoint: '/api',
        graphiql: (request) => shouldRenderGraphiQL(request as GraphQLRequest),
        maskedErrors: isDevelopment,
        schema,
    });
    return server.handle(event.req, event.res);
});
