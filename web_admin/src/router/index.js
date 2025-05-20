import { createRouter, createWebHistory } from 'vue-router'


// 路由开发页面pages
const menus = [
    { path: '/home', name: '首页', component: () => import('@src/views/home.jsx') },
    { path: '/about', name: '关于', component: () => import('@src/views/about.vue') },
    { path: '/setting', name: '设置', component: () => import('@src/views/setting.jsx') },
    {
        path: '/system', name: '权限管理', children: [
            { path: '/system/menu/menu', name: '菜单管理', component: () => import('@src/views/system/menu/menu.vue') },
            { path: '/system/role/role', name: '角色管理', component: () => import('@src/views/system/role/role.vue') },
            { path: '/system/user/user', name: '用户管理', component: () => import('@src/views/system/user/user.vue') },
            { path: '/system/depart/depart', name: '部门管理', component: () => import('@src/views/system/depart/depart.vue') },
            // { path: '/system/depart/depart', name: '部门管理', component: () => import('@src/views/system/depart/depart.jsx') },
        ]
    },
]
let routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', name: '登陆', component: () => import('@src/views/login.vue') },
    { path: '/:catchAll(.*)', name: 'NotFound', component: () => import('@src/views/login.vue') },
    { path: '/', name: 'main', children: menus },
]

let menu_list = adapter_add_field_menu(menus)


// 路由配置
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
})

// 路由守卫
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    if (to.path != "/login" && !token) {
        next('/login')
    } else {
        next()
    }
})

// export default router
export default { router, menus, routes, menu_list }




function adapter_add_field_menu(data) {
    if (Array.isArray(data)) {
        return data.map(item => adapter_add_field_menu(item));
    } else if (typeof data === 'object' && data !== null) {
        const newItem = { ...data };
        if (newItem.name) {
            newItem.menu = newItem.name;
        }
        if (newItem.children) {
            newItem.children = adapter_add_field_menu(newItem.children);
        }
        return newItem;
    }
    return data;
}