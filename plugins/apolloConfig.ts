import { createHttpLink, from, ApolloLink } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { provideApolloClient } from '@vue/apollo-composable';

/**
 * @note
 * This was created to solve getting the
 * user session with Nuxt and Apollo
 * See example: https://github.com/nuxt-modules/apollo/issues/442
 */
export default defineNuxtPlugin((nuxtApp) => {
    const envVars = useRuntimeConfig();
    const cookie = useCookie(envVars.SESSION_NAME);
    const { $apollo } = nuxtApp;

    // trigger the error hook on an error
    const errorLink = onError((err) => {
        nuxtApp.callHook('apollo:error', err); // must be called bc `@nuxtjs/apollo` will not do it anymore
    });

    // create an authLink and set authentication token if necessary
    // (Can not use nuxt apollo hook `apollo:auth` anymore bc `@nuxtjs/apollo` has no control anymore.)
    const authLink = setContext((_, ctx) => {
        return {
            headers: {
                ...ctx.headers,
                'Access-Control-Allow-Origin': 'https://sandbox.embed.apollographql.com',
                'Access-Control-Allow-Credentials': 'true',
                Authorization: `Bearer ${cookie.value}`,
            },
        };
    });

    // create an customLink as example for an custom manual link
    const customLink = new ApolloLink((operation, forward) => {
        return forward(operation).map((data) => {
            return data;
        });
    });

    if (envVars?.APP_URL) {
        // Default httpLink (main communication for apollo)
        const httpLink = createHttpLink({
            credentials: 'include',
            uri: `${envVars.APP_URL}/api/graphql`,
            // uri: envVars.public.APOLLO_ENDPOINT,
            useGETForQueries: true,
        });

        // Set custom links in the apollo client.
        // This is the link chain. Will be walked through from top to bottom. It can only contain 1 terminating
        // Apollo link, see: https://www.apollographql.com/docs/react/api/link/introduction/#the-terminating-link
        $apollo.defaultClient.setLink(from([errorLink, authLink, customLink, httpLink]));

        // For using useQuery in `@vue/apollo-composable`
        provideApolloClient($apollo.defaultClient);
    }
});
