import {createRouter, createWebHashHistory} from 'vue-router'

import {pinyin} from "pinyin-pro"
import pages from "./pages"


const route = [
    //重定向****************************
    // {path: '', redirect: '/login'}, //重定向
    {path: '', redirect: '/system/user'}, //重定向
    {path: '/login', name: '登陆页', component: () => import('@src/login.vue')}, //登陆页
    // {path: '/settings', name: '设置', component: () => import('./pages/settings/settings.vue')}, //登陆页
    {path: '/:catchAll(.*)', name: 'NotFound', component: () => import('@src/NotFound.vue')}, //没有发现页面
    {path: '/', name: 'main',

        component: () => import('@Layout/LayoutView.vue'),
        children:[

        ]


    }


]

export default route