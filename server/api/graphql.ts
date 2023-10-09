import { ApolloServer } from '@apollo/server';
import { startServerAndCreateH3Handler } from '@as-integrations/h3';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { schema } from '~/server/graphql/server';
import { createGraphQLContext } from '~/server/graphql/builder';

const productionOnlyPlugins = () => {
    if (config.APP_ENV === 'production') {
        return [ApolloServerPluginLandingPageDisabled()];
    }

    return [];
};

const config = useRuntimeConfig();
const plugins = [...productionOnlyPlugins()];

const apollo = new ApolloServer({
    formatError: (formattedError, _error) => {
        if (config.APP_ENV === 'production') {
            return {
                message: formattedError.message,
                errors: formattedError?.extensions?.errors ?? {},
            };
        }

        return formattedError;
    },
    nodeEnv: config.APP_ENV,
    schema,
    plugins,
});

export default startServerAndCreateH3Handler(apollo, {
    context: (ctx) => createGraphQLContext(ctx.event),
});
