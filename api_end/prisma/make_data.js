let {PrismaClient} = require("@prisma/client")
const db = new PrismaClient()

//用户表  admin 1 二狗 2 张三 3 李四 4
let tb_user = [
    { id: 1, role: "管理员", uid: "1", username: "admin", password: "123456", nickname: "AD", avatar: "111", email: "11111111@qq.com", tel: "15160315111", order: 111, online: true, update_time: "2023-01-01 04:05:05", create_time: "2023-01-01 04:05:05", is_del: false, kind: "user", },
    { id: 2, role: "用户", uid: "2", username: "二狗", password: "123456", nickname: "小狗", avatar: "111", email: "2222222222@qq.com", tel: "15374118112", order: 111, online: true, update_time: "2023-01-01 05:05:05", create_time: "2023-01-01 05:05:05", is_del: false, kind: "user", },
    { id: 3, role: "用户", uid: "3", username: "张三", password: "123456", nickname: "小张", avatar: "111", email: "3333333333@qq.com", tel: "15374118113", order: 111, online: true, update_time: "2023-01-01 05:05:05", create_time: "2023-01-01 05:05:05", is_del: false, kind: "user", },
    { id: 4, role: "商家", uid: "4", username: "李四", password: "123456", nickname: "小李", avatar: "111", email: "4444444444@qq.com", tel: "15374118114", order: 111, online: true, update_time: "2023-01-01 04:05:05", create_time: "2023-01-01 04:05:05", is_del: false, kind: "user", },
]
// 角色表
let tb_role = [
    { id: 1, role: "管理员", },
    { id: 2, role: "用户", },
    { id: 3, role: "商家", },
]
// 菜单表
let tb_menu = [
    { id: 1, menu: "首页", path: "/home", parent_id: 0 },
    { id: 2, menu: "关于", path: "/about", parent_id: 0 },
    { id: 3, menu: "订单管理", path: "/order_manage", parent_id: 0 },
    { id: 4, menu: "权限管理", path: "/system", parent_id: 0 },//有child 4
    { id: 5, menu: "用户管理", path: "/user/user", parent_id: 4 },
    { id: 6, menu: "菜单管理", path: "/menu/menu", parent_id: 4 },
    { id: 7, menu: "角色管理", path: "/role/role", parent_id: 4 },
]
//关联-角色_菜单     // 管理员1 ,用户2 商家3
let role_menu = [
    { id: 1, role_id: 1, menu_id: 1 }, //管理员   -首页
    { id: 2, role_id: 1, menu_id: 2 }, //管理员   -关于
    { id: 3, role_id: 1, menu_id: 3 }, //管理员   -订单管理
    { id: 4, role_id: 1, menu_id: 4 }, //管理员   -权限管理
    { id: 5, role_id: 1, menu_id: 5 }, //管理员   -用户管理
    { id: 6, role_id: 1, menu_id: 6 }, //管理员   -菜单管理
    { id: 7, role_id: 1, menu_id: 7 }, //管理员   -角色管理
    { id: 8, role_id: 2, menu_id: 1 }, //用户     -首页
    { id: 9, role_id: 2, menu_id: 2 }, //用户     -关于
    { id: 10, role_id: 3, menu_id: 3 },//商家     -订单管理
]
//关联-角色_用户
let role_user = [
    { id: 1, role_id: 1, user_id: 1 },//admin   -管理员
    { id: 2, role_id: 2, user_id: 1 },//admin   -用户
    { id: 3, role_id: 2, user_id: 1 },//admin   -商家
    { id: 4, role_id: 2, user_id: 2 },//二狗    -用户
    { id: 5, role_id: 3, user_id: 2 },//二狗    -商家
    { id: 6, role_id: 2, user_id: 3 },//张三    -用户
    { id: 7, role_id: 3, user_id: 4 },//李四    -商家
]

// 操作
dao = {
    tb_user: async function () {
        await db.tb_user.deleteMany();
        let result = await db.tb_user.createMany({data: tb_user})
        console.log(`tb_user---成功:创建数据${result.count}条记录`);
    },//
    
    tb_role: async function () {
        await db.tb_role.deleteMany();
        let result = await db.tb_role.createMany({data: tb_role})
        console.log(`tb_role---成功:创建数据${result.count}条记录`);
    },//

    tb_menu: async function () {
        await db.tb_menu.deleteMany();
        let result = await db.tb_menu.createMany({data: tb_menu})
        console.log(`tb_menu---成功:创建数据${result.count}条记录`);
    },//

    role_menu: async function () {
        await db.role_menu.deleteMany();
        let result = await db.role_menu.createMany({data: role_menu})
        console.log(`role_menu---成功:创建数据${result.count}条记录`);
    },//

    role_user: async function () {
        await db.role_user.deleteMany();
        let result = await db.role_user.createMany({data: role_user})
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
//         let result = await db.tb_user.createMany({data: tb_user})
//         console.log(`成功创建了 ${result.count} 条记录`);
//     } catch (error) {
//         console.error('批量创建记录时出错:', error);
//     }
// }
//
// run();