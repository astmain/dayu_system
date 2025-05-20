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

// 根据查询条件，生成一个菜单树
