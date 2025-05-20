let {PrismaClient} = require("@prisma/client")
const db = new PrismaClient()

//用户表  admin 1 二狗 2 张三 3 李四 4
let tb_user = [
    {id: 1, username: "admin", password: "123456", nickname: "AD", avatar: "111", email: "11111111@qq.com", tel: "15160315110", order: 111, online: true, update_time: "2023-01-01 04:05:05", create_time: "2023-01-01 04:05:05", is_del: false,},
    {id: 2, username: "二狗", password: "123456", nickname: "小狗", avatar: "111", email: "2222222222@qq.com", tel: "15374118112", order: 111, online: true, update_time: "2023-01-01 05:05:05", create_time: "2023-01-01 05:05:05", is_del: false,},
    {id: 3, username: "张三", password: "123456", nickname: "小张", avatar: "111", email: "3333333333@qq.com", tel: "15374118113", order: 111, online: true, update_time: "2023-01-01 05:05:05", create_time: "2023-01-01 05:05:05", is_del: false,},
    {id: 4, username: "李四", password: "123456", nickname: "小李", avatar: "111", email: "4444444444@qq.com", tel: "15374118114", order: 111, online: true, update_time: "2023-01-01 04:05:05", create_time: "2023-01-01 04:05:05", is_del: false,},
    {id: 5, username: "王五", password: "123456", nickname: "小李", avatar: "111", email: "5555555555@qq.com", tel: "15374118115", order: 111, online: true, update_time: "2023-01-01 04:05:05", create_time: "2023-01-01 04:05:05", is_del: false,},
]
// 角色表
let tb_role = [
    {id: 1, role: "管理员",},
    {id: 2, role: "用户",},
    {id: 3, role: "商家",},
]
// 菜单表
let tb_menu = [
    {id: 2111, menu: "设置", path: "/setting", parent_id: 0},
    {id: 1, menu: "首页", path: "/home", parent_id: 0},
    {id: 2, menu: "关于", path: "/about", parent_id: 0},

    {id: 3, menu: "订单管理", path: "/order_manage", parent_id: 0},
    {id: 4, menu: "权限管理", path: "/system", parent_id: 0},//有child 4
    {id: 5, menu: "用户管理", path: "/user/user", parent_id: 4},
    {id: 6, menu: "菜单管理", path: "/menu/menu", parent_id: 4},
    {id: 7, menu: "角色管理", path: "/role/role", parent_id: 4},
    {id: 8, menu: "部门管理", path: "/depart/depart", parent_id: 4},
]


//关联-角色_菜单     // 管理员1 ,用户2 商家3
let role_menu = [
    {id: 2111, role_id: 1, menu_id: 2111}, //管理员   -设置
    {id: 1, role_id: 1, menu_id: 1}, //管理员   -首页
    {id: 2, role_id: 1, menu_id: 2}, //管理员   -关于
    {id: 3, role_id: 1, menu_id: 3}, //管理员   -订单管理
    {id: 4, role_id: 1, menu_id: 4}, //管理员   -权限管理
    {id: 5, role_id: 1, menu_id: 5}, //管理员   -用户管理
    {id: 6, role_id: 1, menu_id: 6}, //管理员   -菜单管理
    {id: 7, role_id: 1, menu_id: 7}, //管理员   -角色管理
    {id: 8, role_id: 1, menu_id: 8}, //管理员   -角色管理
    {id: 9, role_id: 2, menu_id: 1}, //用户     -首页
    {id: 10, role_id: 2, menu_id: 2}, //用户     -关于
    {id: 11, role_id: 3, menu_id: 3},//商家     -订单管理
]
//关联-角色_用户
let role_user = [
    {id: 1, role_id: 1, user_id: 1},//admin   -管理员
    {id: 2, role_id: 2, user_id: 1},//admin   -用户
    {id: 3, role_id: 2, user_id: 1},//admin   -商家
    {id: 4, role_id: 2, user_id: 2},//二狗    -用户
    {id: 5, role_id: 3, user_id: 2},//二狗    -商家
    {id: 6, role_id: 2, user_id: 3},//张三    -用户
    {id: 7, role_id: 3, user_id: 4},//李四    -商家
]


//部门表
let tb_depart = [
    {id: 1, depart: "大宇三维打印", parent_id: 0},//总公司
    {id: 2, depart: "技术部", parent_id: 1},//技术部
    {id: 3, depart: "普通用户", parent_id: 0},//普通用户

    //
    {id: 2001, depart: "泉州分公司", parent_id: 1},//泉州分公司
    {id: 20011, depart: "财务部", parent_id: 2001},//财务部
    {id: 20012, depart: "业务部", parent_id: 2001},//业务部

    //
    {id: 2002, depart: "德化分公司", parent_id: 1},//德化分公司
    {id: 20021, depart: "财务部", parent_id: 2002},//财务部
    {id: 20022, depart: "业务部", parent_id: 2002},//业务部
]


//关联-部门_用户        //用户表  admin 1 二狗 2 张三 3 李四 4
let depart_user = [
    {id: 1, depart_id: 2, user_id: 1},//admin
    {id: 2, depart_id: 20011, user_id: 2},//二狗
    {id: 3, depart_id: 20012, user_id: 3},//张三
    {id: 4, depart_id: 20021, user_id: 4},//李四
    {id: 5, depart_id: 20022, user_id: 5},//王五-------------
    {id: 9, depart_id: 2, user_id: 5},//王五
    {id: 10, depart_id: 3, user_id: 5},//王五
]

//关联-部门_菜单(权限)
let depart_menu = [
    // high
    {id: 1, depart_id: 2, menu_id: 1, role: "high-技术-admin"},//base-技术-admin
    {id: 2, depart_id: 2, menu_id: 2, role: "high-技术-admin"},
    {id: 3, depart_id: 2, menu_id: 3, role: "high-技术-admin"},
    {id: 4, depart_id: 2, menu_id: 4, role: "high-技术-admin"},
    {id: 5, depart_id: 2, menu_id: 5, role: "high-技术-admin"},
    {id: 6, depart_id: 2, menu_id: 6, role: "high-技术-admin"},
    {id: 7, depart_id: 2, menu_id: 7, role: "high-技术-admin"},
    {id: 8, depart_id: 2, menu_id: 8, role: "high-技术-admin"},
    {id: 9, depart_id: 20011, menu_id: 1, role: "high-泉州-财务"},//base-泉州-财务
    {id: 10, depart_id: 20011, menu_id: 2, role: "high-泉州-财务"},
    {id: 11, depart_id: 20011, menu_id: 3, role: "high-泉州-财务"},
    {id: 12, depart_id: 20012, menu_id: 1, role: "high-泉州-业务"},//base-泉州-业务
    {id: 13, depart_id: 20012, menu_id: 2, role: "high-泉州-业务"},
    {id: 14, depart_id: 20021, menu_id: 1, role: "high-德化-财务"},//base-德化-财务
    {id: 15, depart_id: 20021, menu_id: 2, role: "high-德化-财务"},
    {id: 16, depart_id: 20021, menu_id: 3, role: "high-德化-财务"},
    {id: 17, depart_id: 20022, menu_id: 1, role: "high-德化-业务"},//base-德化-业务
    {id: 18, depart_id: 20022, menu_id: 2, role: "high-德化-业务"},//base-德化-业务
    // low
    {id: 19, depart_id: 20011, menu_id: 1, del: false, add: false, update: false, role: "low-泉州-财务"},//base-泉州-财务
    {id: 20, depart_id: 20011, menu_id: 2, del: false, add: false, update: false, role: "low-泉州-财务"},
    {id: 21, depart_id: 20011, menu_id: 3, del: false, add: false, update: false, role: "low-泉州-财务"},
    {id: 22, depart_id: 20012, menu_id: 1, del: false, add: false, update: false, role: "low-泉州-业务"},//base-泉州-业务
    {id: 23, depart_id: 20012, menu_id: 2, del: false, add: false, update: false, role: "low-泉州-业务"},
    {id: 24, depart_id: 20021, menu_id: 1, del: false, add: false, update: false, role: "low-德化-财务"},//base-德化-财务
    {id: 25, depart_id: 20021, menu_id: 2, del: false, add: false, update: false, role: "low-德化-财务"},
    {id: 26, depart_id: 20021, menu_id: 3, del: false, add: false, update: false, role: "low-德化-财务"},
    {id: 27, depart_id: 20022, menu_id: 1, del: false, add: false, update: false, role: "low-德化-业务"},//base-德化-业务
    {id: 28, depart_id: 20022, menu_id: 2, del: false, add: false, update: false, role: "low-德化-业务"},//base-德化-业务


]

// id        Int     @id @default(autoincrement())
// depart_id Int
// menu_id   Int
// role      String
// look      Boolean @default(true)
// del       Boolean @default(false)
// add       Boolean @default(false)
// update    Boolean @default(false)
// other     String


/*
    {id: 2111, menu: "设置", path: "/setting", parent_id: 0},
    {id: 1, menu: "首页", path: "/home", parent_id: 0},
    {id: 2, menu: "关于", path: "/about", parent_id: 0},

    {id: 3, menu: "订单管理", path: "/order_manage", parent_id: 0},
    {id: 4, menu: "权限管理", path: "/system", parent_id: 0},//有child 4
    {id: 5, menu: "用户管理", path: "/user/user", parent_id: 4},
    {id: 6, menu: "菜单管理", path: "/menu/menu", parent_id: 4},
    {id: 7, menu: "角色管理", path: "/role/role", parent_id: 4},
    {id: 8, menu: "部门管理", path: "/depart/depart", parent_id: 4},




* */


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


    tb_depart: async function () {
        await db.tb_depart.deleteMany();
        let result = await db.tb_depart.createMany({data: tb_depart})
        console.log(`tb_depart---成功:创建数据${result.count}条记录`);
    },
    depart_user: async function () {
        await db.depart_user.deleteMany();
        let result = await db.depart_user.createMany({data: depart_user})
        console.log(`depart_user---成功:创建数据${result.count}条记录`);
    },

    depart_menu: async function () {
        await db.depart_menu.deleteMany();
        let num=0
        for (let i = 0; i < depart_menu.length; i++) {
        num+=1
            let ele = depart_menu[i]
         ele['id']=num
            let result = await db.depart_menu.create({data: ele})
        }
        console.log(`depart_user---成功:创建数据${num}条记录`);
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
        await dao.tb_depart()
        await dao.depart_user()
        await dao.depart_menu()

    } catch (error) {
        console.error('批量创建记录时出错:', error);
    }


}

make_data()
