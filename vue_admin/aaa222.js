//用户表
tb_user = [
    {role: "管理员", uid: "0", username: "admin", password: "123456", nickname: "admin_nickname", avatar: "111", email: "1311192345@qq.com", tel: "15160315110", order: 111, online: true, update_time: "2023-01-01 04:05:05", create_time: "2023-01-01 04:05:05", is_del: false, kind: "user",},
    {role: "用户", uid: "3", username: "张三", password: "123456", nickname: "小张", avatar: "111", email: "12345678912@qq.com", tel: "12345678912", order: 111, online: true, update_time: "2023-01-01 05:05:05", create_time: "2023-01-01 05:05:05", is_del: false, kind: "user",},
    {role: "商家", uid: "4", username: "李四", password: "123456", nickname: "小李", avatar: "111", email: "1172085478@qq.com", tel: "15374118110", order: 111, online: true, update_time: "2023-01-01 04:05:05", create_time: "2023-01-01 04:05:05", is_del: false, kind: "user",},
]
// 角色表
tb_role = [
    {role: "管理员",},
    {role: "用户",},
    {role: "商家",},
]
// 菜单表
tb_menu = [
    {menu: "首页", path: "/home", parent: ""},
    {menu: "关于", path: "/about", parent: ""},
    {menu: "订单管理", path: "/order_manage", parent: ""},
    {menu: "权限管理", path: "/system", parent: ""},
    {menu: "用户管理", path: "/system/user", parent: "权限管理"},
    {menu: "菜单管理", path: "/system/menu", parent: "权限管理"},
]
//关联-角色_菜单
role_menu = [
    {role: "管理员", menu: "首页"},
    {role: "管理员", menu: "关于"},
    {role: "管理员", menu: "权限管理"},
    {role: "管理员", menu: "用户管理"},
    {role: "管理员", menu: "菜单管理"},
    {role: "管理员", menu: "订单管理"},
    {role: "用户", menu: "首页"},
    {role: "用户", menu: "关于"},
    {role: "商家", menu: "订单管理"},
]
//关联-角色_用户
role_user = [
    {username: "admin", role: "管理员"},
    {username: "张三", role: "用户"},
    {username: "李四", role: "用户"},
    {username: "李四", role: "商家"},
]

// 查询条件
q={username: "admin"}
q={username: "admin"}


// Helper function to build menu tree
function buildMenuTree(menus, parent = "") {
    return menus
        .filter(item => item.parent === parent)
        .map(item => ({
            menu: item.menu,
            path: item.path,
            children: buildMenuTree(menus, item.menu)
        }))
        .filter(item => item !== null);
}

// 1. Find user's roles from role_user table
const userRoles = role_user
    .filter(ru => ru.username === q.username)
    .map(ru => ru.role);
// For admin user, this will be ["管理员"]

// 2. Get all menus for these roles from role_menu table
const userMenus = role_menu
    .filter(rm => userRoles.includes(rm.role))
    .map(rm => rm.menu);
// For admin user, this will be ["首页", "关于", "权限管理", "用户管理", "菜单管理"]

// 3. Get full menu details from tb_menu
const fullMenus = tb_menu.filter(m => userMenus.includes(m.menu));

// 4. Build the tree structure
const menuTree = buildMenuTree(fullMenus);

// Result:
const result = {
    status: "success",
    data: menuTree
};

console.log(menuTree)

/* The resulting menu tree will look like this:
{
    "status": "success",
    "data": [
        {
            "menu": "首页",
            "path": "/home",
            "children": []
        },
        {
            "menu": "关于",
            "path": "/about",
            "children": []
        },
        {
            "menu": "权限管理",
            "path": "/system",
            "children": [
                {
                    "menu": "用户管理",
                    "path": "/system/user",
                    "children": []
                },
                {
                    "menu": "菜单管理",
                    "path": "/system/menu",
                    "children": []
                }
            ]
        }
    ]
}
*/