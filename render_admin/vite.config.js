import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'


//
import requireTransform from "vite-plugin-require-transform";
import ReactivityTransform from "@vue-macros/reactivity-transform/vite"; // npm install @vue-macros/reactivity-transform -D

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
        requireTransform({fileRegex: /(.vue|.js?|.jsx?|.tsx?)$/}),
        ReactivityTransform(), //child111_$ref_省略点value
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
            '@Layout': fileURLToPath(new URL('./src/Layout', import.meta.url)),
            '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
        },
    },
    server: {
        host: "0.0.0.0",
        https: false, // 是否开启 https
        port: 4000, //指定端口号,
        open: false, //打开浏览器
        changeOrigin: true, //改变 请求头Origin头
        //代理             https://www.bilibili.com/video/BV1GN4y1M7P5/?p=34
        proxy: {
            "/api": {
                target: "http://xxx.xxxxx.xxx/",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
})
