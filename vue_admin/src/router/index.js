import { createRouter, createWebHistory } from 'vue-router'


const pages = [
    {
        path: '/home',
        name: '首页',
        component: () => import('@src/views/home.vue'),
    },
    {
        path: '/about',
        name: '关于',
        component: () => import('@src/views/home.vue'),
    },
    {
        path: '/system',
        name: '权限管理',
        children: [
            {
                path: '/system/user',
                name: '用户管理',
                component: () => import('@src/views/system/user.vue'),
            }
        ]
    },
]


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', name: '登陆', component: () => import('@src/views/login.vue'), },
        { path: '/:catchAll(.*)', name: 'NotFound', component: () => import('@src/views/login.vue'), },
        { path: '/', name: 'main', children: pages },
    ]
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

export default router 