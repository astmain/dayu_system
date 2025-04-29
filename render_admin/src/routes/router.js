import {createRouter, createWebHashHistory} from 'vue-router'

import {pinyin} from "pinyin-pro"
import pages from "./pages"


const routes = [//
    //重定向****************************
    // {path: '', redirect: '/login'}, //重定向
    {path: '', redirect: '/system/user'}, //重定向
    {path: '/login', name: '登陆页', component: () => import('@src/login.vue')}, //登陆页
    // {path: '/settings', name: '设置', component: () => import('./pages/settings/settings.vue')}, //登陆页
    {path: '/:catchAll(.*)', name: 'NotFound', component: () => import('@src/NotFound.vue')}, //没有发现页面
    ...pages
]


let routes_new = globalThis.routes_new = appendSuffixToNames({my_list: routes, my_key: "path", my_children: "children"})


const router = createRouter({
    history: createWebHashHistory(),//
    routes: routes_new,//
})


export default router


function appendSuffixToNames({my_list, my_key, my_children}) {
    return my_list.map(item => {
        // 创建新对象并赋值
        let newItem = {...item};

        //重定向处理
        if (newItem.redirect) {
            newItem.redirect = pinyin(newItem.redirect, {toneType: "none", nonZh: 'consecutive', separator: '_',});
        }

        // 转换 name 属性为拼音
        if (newItem[my_key]) {
            // console.log(`item---:`, item)
            newItem[my_key] = pinyin(newItem[my_key], {toneType: "none", nonZh: 'consecutive', separator: '_',});
        }

        // 递归处理 children
        if (Array.isArray(newItem[my_children])) {
            newItem[my_children] = appendSuffixToNames({my_list: newItem[my_children], my_key, my_children,});
        }

        return newItem; // 返回新对象
    });
}

