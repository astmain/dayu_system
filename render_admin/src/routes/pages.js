let pages = [
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

export default pages