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
            '@src': fileURLToPath(new URL('./src', import.meta.url)),
            '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
            '@Layout': fileURLToPath(new URL('./src/Layout', import.meta.url)),
            '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
        },
    },
    // server: {
    //     host: "0.0.0.0",
    //     https: false, // 是否开启 https
    //     port: 4000, //指定端口号,
    //     open: false, //打开浏览器
    //     changeOrigin: true, //改变 请求头Origin头
    //     //代理             https://www.bilibili.com/video/BV1GN4y1M7P5/?p=34
    //     proxy: {
    //         "/api": {
    //             target: "http://xxx.xxxxx.xxx/",
    //             changeOrigin: true,
    //             rewrite: (path) => path.replace(/^\/api/, ""),
    //         },
    //     },
    // },
    server: {
        host: "0.0.0.0",
        port: 4000,
        proxy: {
            // 以 /api 开头的请求将被代理到目标服务器
            '/api': {
                target: 'http://localhost:3000', // 后端服务器地址
                changeOrigin: true, // 允许跨域
                rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径，去掉 /api 前缀
            },
        },
    },
})
