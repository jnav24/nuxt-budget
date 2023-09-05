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
    apollo: {
        clients: {
            default: {
                httpEndpoint: '/api/graphql',
            },
        },
    },
    graphqlServer: {
        schema: './server/graphql/generated/schema.graphql',
        url: '/api/graphql',
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    runtimeConfig: {
        APP_ENV: process.env.APP_ENV ?? 'development',
        DB_URL: process.env.DB_URL,
        HASH_KEY: process.env.HASH_KEY,
        ENCRYPT_SECRET: process.env.ENCRYPT_SECRET,
        REDIS_HOST: process.env.REDIS_HOST ?? '',
        REDIS_PASSWORD: process.env.REDIS_PASSWORD ?? '',
        REDIS_PRIMARY_PORT: process.env.REDIS_PRIMARY_PORT ?? '6379',
        REDIS_REPLICA_PORT: process.env.REDIS_REPLICA_PORT ?? '6380',
        SESSION_AUTH_EXPIRATION: process.env.SESSION_EXPIRATION ?? '29',
        SESSION_NAME: process.env.SESSION_NAME ?? '',
        public: {
            APP_NAME: process.env.APP_NAME,
        },
    },
});
