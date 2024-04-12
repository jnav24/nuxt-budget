// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    app: {
        head: {
            link: [{ rel: 'icon', href: 'https://dimebudget.app/favicon.ico' }],
            meta: [
                {
                    name: 'description',
                    content:
                        'Dime Budget is an open sourced  budget tracker for those who desire a simple, free solution to track their everyday expenses.',
                },
            ],
            title: 'Dime Budget',
        },
    },
    css: ['~/assets/css/main.css'],
    modules: [
        './modules/db/module',
        './modules/form/module',
        'nuxt-graphql-server',
        '@nuxtjs/apollo',
    ],
    // @note
    // Apollo configuration set here will
    // be overriden by apolloConfig.ts
    apollo: {
        clients: {
            default: {
                httpEndpoint: 'http://localhost:3313/api/graphql',
                // @NOTE
                // These settings allow Apollo Playground to read the cookies.
                // You will also have to make sure to turn on `include cookies` in
                // the `connection settings` in Apollo Playground.
                httpLinkOptions: {
                    credentials: 'include',
                    headers: {
                        'Access-Control-Allow-Origin': 'https://sandbox.embed.apollographql.com',
                        'Access-Control-Allow-Credentials': 'true',
                    },
                },
            },
        },
    },
    graphqlServer: {
        schema: './server/graphql/generated/schema.graphql',
        url: 'http://localhost:3313/api/graphql',
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    runtimeConfig: {
        APP_ENV: process.env.APP_ENV ?? 'development',
        AUTH_EXPIRATION: process.env.AUTH_EXPIRATION ?? '15',
        DB_URL: process.env.DB_URL,
        HASH_KEY: process.env.HASH_KEY,
        ENCRYPT_SECRET: process.env.ENCRYPT_SECRET,
        REDIS_HOST: process.env.REDIS_HOST ?? '',
        REDIS_PASSWORD: process.env.REDIS_PASSWORD ?? '',
        REDIS_PRIMARY_PORT: process.env.REDIS_PRIMARY_PORT ?? '6379',
        REDIS_REPLICA_PORT: process.env.REDIS_REPLICA_PORT ?? '6380',
        SESSION_EXPIRATION: process.env.SESSION_EXPIRATION ?? '60',
        SESSION_NAME: process.env.SESSION_NAME ?? '',
        RATELIMIT_ATTEMPTS: process.env.RATELIMIT_ATTEMPTS ?? '3',
        public: {
            APP_NAME: process.env.APP_NAME,
        },
    },
});
