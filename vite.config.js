import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    define: {
        'process.env': {
            VUE_APP_WEBSOCKETS_SERVER: '127.0.0.1',
            VUE_APP_WEBSOCKETS_KEY: '18f8d7457b2a1c539116333442003',
            baseURL: 'http://127.0.0.1:8000',
        },
    },
    plugins: [
        vue(),
        laravel({
            input: ['resources/js/app.js'],
            refresh: true,
        }),
    ],
});
