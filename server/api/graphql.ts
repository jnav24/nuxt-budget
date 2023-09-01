import { ApolloServer } from '@apollo/server';
import { startServerAndCreateH3Handler } from '@as-integrations/h3';
import { schema } from '~/server/graphql/server';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';

const productionOnlyPlugins = () => {
    if (config.APP_ENV === 'production') {
        return [ApolloServerPluginLandingPageDisabled()];
    }

    return [];
};

const config = useRuntimeConfig();
const plugins = [...productionOnlyPlugins()];

const apollo = new ApolloServer({
    formatError: (formattedError, error) => {
        if (config.APP_ENV === 'production') {
            return {
                message: formattedError.message,
            };
        }

        return formattedError;
    },
    nodeEnv: config.APP_ENV,
    schema,
    plugins,
});

export default startServerAndCreateH3Handler(apollo);
