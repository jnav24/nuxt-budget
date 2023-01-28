/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}',
        './app.vue',
    ],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        fontFamily: {
            body: ['Nunito', 'sans-serif'],
            header: ['Avenir', 'Helvetica', 'Arial', 'sans-serif'],
        },
        extend: {
            colors: {
                danger: '#C62828',
                'dark-danger': '#4B0F0F',
                'dark-primary': '#264653',
                'dark-secondary': '#A88D3E',
                primary: '#45ADA8',
                secondary: '#EFC958',
            },
            minHeight: {
                64: '16rem',
                256: '64rem',
            },
            maxHeight: {
                48: '12rem',
            },
            maxWidth: {
                32: '8rem',
            },
            minWidth: {
                6: '1.5rem',
            },
            opacity: {
                85: '0.85',
                95: '0.95',
            },
            translate: {
                '6/7': '85.7142857%',
                '7/8': '87.5%',
                '9/10': '90%',
            },
            width: {
                100: '25rem',
                150: '38rem',
                200: '50rem',
                250: '63rem',
                300: '75rem',
            },
            zIndex: {
                100: 100,
            },
        },
    },
    plugins: [],
};
