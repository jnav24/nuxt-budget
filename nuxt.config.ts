// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    runtimeConfig: {
        DB_URL: process.env.DB_URL,
        REDIS_HOST: process.env.REDIS_HOST ?? '',
        REDIS_PASSWORD: process.env.REDIS_PASSWORD ?? '',
        REDIS_PRIMARY_PORT: process.env.REDIS_PRIMARY_PORT ?? 6379,
        public: {
            APP_NAME: process.env.APP_NAME,
        },
    },
});
