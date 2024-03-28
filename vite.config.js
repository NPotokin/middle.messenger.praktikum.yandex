import {defineConfig} from 'vite';
import handlebars from 'vite-plugin-handlebars'
import {resolve} from 'path'



export default defineConfig({
    root: resolve(__dirname, 'src'),
    build: {
        outDir: resolve(__dirname, 'dist')
    },
    plugins: [
        handlebars(),
    ],
    css: {
        postcss,
    } 
});
