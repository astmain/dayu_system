//用户表
let tb_user = [
    {role: "管理员", uid: "0", username: "admin", password: "123456", nickname: "admin_nickname", avatar: "111", email: "1311192345@qq.com", tel: "15160315110", order: 111, online: true, update_time: "2023-01-01 04:05:05", create_time: "2023-01-01 04:05:05", is_del: false, kind: "user",},
    {role: "用户", uid: "3", username: "张三", password: "123456", nickname: "小张", avatar: "111", email: "12345678912@qq.com", tel: "12345678912", order: 111, online: true, update_time: "2023-01-01 05:05:05", create_time: "2023-01-01 05:05:05", is_del: false, kind: "user",},
    {role: "商家", uid: "4", username: "李四", password: "123456", nickname: "小李", avatar: "111", email: "1172085478@qq.com", tel: "15374118110", order: 111, online: true, update_time: "2023-01-01 04:05:05", create_time: "2023-01-01 04:05:05", is_del: false, kind: "user",},
]
// 角色表
let tb_role = [
    {role: "管理员",},
    {role: "用户",},
    {role: "商家",},
]
// 菜单表
let tb_menu = [
    {id: 1, menu: "首页", path: "/home", parent: ""},
    {id: 2, menu: "关于", path: "/about", parent: ""},
    {id: 3, menu: "订单管理", path: "/order_manage", parent: ""},
    {id: 4, menu: "权限管理", path: "/system", parent: ""},
    {id: 5, menu: "用户管理", path: "/system/user", parent: "权限管理"},
    {id: 6, menu: "菜单管理", path: "/system/menu", parent: "权限管理"},
    {id: 6, menu: "111", path: "/111", parent: ""},
]
//关联-角色_菜单
let role_menu = [
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
let role_user = [
    {username: "admin", role: "管理员"},
    {username: "张三", role: "用户"},
    {username: "李四", role: "用户"},
    {username: "李四", role: "商家"},
]

// 查询条件
// q = {username: "admin"}
// q = {username: "张三"}
// q = {username: "李四"}

let username = "admin"


export default function make_menu_tree({username, tb_role, tb_menu, role_user, role_menu,}) {
    let userRoles = role_user.filter(ru => ru.username === username).map(ru => ru.role)
    // console.log(`111---userRoles:`, userRoles)
    let userMenus = role_menu.filter(rm => userRoles.includes(rm.role)).map(rm => rm.menu)
    // console.log(`222---userMenus:`, userMenus)
    let menus = tb_menu.filter(m => userMenus.includes(m.menu))

    // 如果是超级管理查看全部菜单
    if (username === "admin") menus = tb_menu


    function buildMenuTree(menus, parent = "") {
        return menus.filter(item => item.parent === parent)
            .map(item => ({
                id: item.id,
                menu: item.menu,
                path: item.path,
                children: buildMenuTree(menus, item.menu)
            }))
            .filter(item => item !== null);
    }

    return buildMenuTree(menus)
}

let res = make_menu_tree({username, tb_role, tb_menu, role_user, role_menu,})
console.log(JSON.stringify(res, null, 2))
