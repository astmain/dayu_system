import {createRouter, createWebHashHistory, createWebHistory} from "vue-router"
import {pinyin} from "pinyin-pro"
import pages from "./pages.js"    //定义页面
import route from "./route.js"
import router from "@/routes/router.js";    //固定页面


export default function config_routes({app}) {
    const routes = [
        //重定向****************************
        {path: '', redirect: '/system/user'}, //重定向
        {path: '/login', name: '登陆页', component: () => import('@src/login.vue')}, //登陆页
        {path: '/:catchAll(.*)', name: 'NotFound', component: () => import('@src/NotFound.vue')}, //没有发现页面
        {
            path: '/', name: 'main',
            component: () => import('@Layout/LayoutView.vue'),
            children: [
                {
                    path: '/home', name: '首页',
                    component: () => import('@pages/home.vue'),
                },
                {
                    path: '/system', name: '权限管理',
                    component: () => import('@Layout/LayoutView.vue'),
                    children: [
                        {path: '/system/menu', name: '菜单管理', component: () => import('@pages/system/menu.vue')}, //
                        {path: '/system/role', name: '角色管理', component: () => import('@pages/system/role.vue')}, //
                        {path: '/system/user', name: '用户管理', component: () => import('@pages/system/user.vue')}, //
                    ],
                },

            ]


        }
    ]
    const routes_new = appendSuffixToNames({my_list: routes, my_key: "path", my_children: "children"})
    const router = createRouter({
        history: createWebHashHistory(),            //哈希模式路由
        // history: createWebHistory(),             //页面模式路由
        routes: routes_new,                         //全部路由
        strict: true,                               //是否应该禁止尾部斜杠,默认为假
        scrollBehavior: (to, from, position) => (position ? position : {top: 0})//配合浏览器前进后退
    })


    router.beforeEach((to, from, next) => {
        console.log(`router---to:`, to)
        console.log(`router---from:`, from)
        next()
    })


    app.app_router = router
    app.use(router)
}


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


