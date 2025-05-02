let {PrismaClient} = require("@prisma/client")
const dn = new PrismaClient()

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
    {menu: "用户管理", path: "/system/user/user", parent: "权限管理"},
    {menu: "菜单管理", path: "/system/menu/menu", parent: "权限管理"},
    {menu: "角色管理", path: "/system/role/role", parent: "权限管理"},
]
//关联-角色_菜单
role_menu = [
    {role: "管理员", menu: "首页"},
    {role: "管理员", menu: "关于"},
    {role: "管理员", menu: "订单管理"},
    {role: "管理员", menu: "权限管理"},
    {role: "管理员", menu: "用户管理"},
    {role: "管理员", menu: "菜单管理"},
    {role: "管理员", menu: "角色管理"},
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

// 操作
dao = {
    tb_user: async function () {
        await dn.tb_user.deleteMany();
        let result = await dn.tb_user.createMany({data: tb_user})
        console.log(`tb_user---成功:创建数据${result.count}条记录`);
    }, tb_role: async function () {
        await dn.tb_role.deleteMany();
        let result = await dn.tb_role.createMany({data: tb_role})
        console.log(`tb_role---成功:创建数据${result.count}条记录`);
    }, tb_menu: async function () {
        await dn.tb_menu.deleteMany();
        let result = await dn.tb_menu.createMany({data: tb_menu})
        console.log(`tb_menu---成功:创建数据${result.count}条记录`);
    }, role_menu: async function () {
        await dn.role_menu.deleteMany();
        let result = await dn.role_menu.createMany({data: role_menu})
        console.log(`role_menu---成功:创建数据${result.count}条记录`);
    }, role_user: async function () {
        await dn.role_user.deleteMany();
        let result = await dn.role_user.createMany({data: role_user})
        console.log(`role_user---成功:创建数据${result.count}条记录`);
    },

}


// 构建数据
async function make_data() {
    try {
        await dao.tb_user()
        await dao.tb_role()
        await dao.tb_menu()
        await dao.role_menu()
        await dao.role_user()

    } catch (error) {
        console.error('批量创建记录时出错:', error);
    }


}

make_data()

//
// async function run() {
//     try {
//         let result = await dn.tb_user.createMany({data: tb_user})
//         console.log(`成功创建了 ${result.count} 条记录`);
//     } catch (error) {
//         console.error('批量创建记录时出错:', error);
//     }
// }
//
// run();