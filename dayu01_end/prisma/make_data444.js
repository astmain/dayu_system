let {PrismaClient} = require("@prisma/client")
const db = new PrismaClient()
make_data()

async function make_data() {
    let tb_user = [
        {user_id: 1, username: '许鹏', tel: '111',},
        {user_id: 2, username: '二狗', tel: '222',},
        {user_id: 3, username: '张三', tel: '333',},
        {user_id: 4, username: '李四', tel: '444',},
        {user_id: 5, username: '王五', tel: '555',},
        {user_id: 6, username: '赵六', tel: '666',},
        {user_id: 7, username: '孙七', tel: '777',},
    ]
    let tb_depart = [
        {depart_id: 1, depart: "大宇三维打印", parent_id: 0}, //总公司
        {depart_id: 3, depart: "客户", parent_id: 1},        //客户
        {depart_id: 10000, depart: "用户", parent_id: 1},    //用户
        {depart_id: 20000, depart: "技术部", parent_id: 1},  //技术部
        //
        {depart_id: 30000, depart: "泉州分公司", parent_id: 1},//泉州分公司
        {depart_id: 30001, depart: "财务部", parent_id: 30000},//财务部
        {depart_id: 30002, depart: "业务部", parent_id: 30000},//业务部
        //
        {depart_id: 40000, depart: "德化分公司", parent_id: 1},//德化分公司
        {depart_id: 40001, depart: "财务部", parent_id: 40000},//财务部
        {depart_id: 40002, depart: "业务部", parent_id: 40000},//业务部
    ]
    let tb_menu = [
        {menu_id: 1, menu: "首页", path: "/home", parent_id: 0},
        {menu_id: 2, menu: "关于", path: "/about", parent_id: 0},
        {menu_id: 3, menu: "设置", path: "/setting", parent_id: 0},
        {menu_id: 4, menu: "订单管理", path: "/order_manage", parent_id: 0},
        {menu_id: 5, menu: "权限管理", path: "/system", parent_id: 0},//权限管理 5
        {menu_id: 6, menu: "用户管理", path: "/user/user", parent_id: 5},
        {menu_id: 7, menu: "菜单管理", path: "/menu/menu", parent_id: 5},
        {menu_id: 666, menu: "商品管理", path: "/mall_goods", parent_id: 0},
        {menu_id: 777, menu: "商城购物", path: "/mall_shop", parent_id: 0},
        {menu_id: 888, menu: "购物订单", path: "/mall_order", parent_id: 0},
        {menu_id: 999, menu: "购物车", path: "/mall_car", parent_id: 0},
    ]
    //模型lv: 1 2 3
    let depart_role = [
        {id: 1, name: "财务部", lv: 1, depart_id: 30001},//泉州分公司
        {id: 2, name: "财务部", lv: 2, depart_id: 30001},
        {id: 3, name: "财务部", lv: 3, depart_id: 30001},
        {id: 4, name: "业务部", lv: 1, depart_id: 30002},
        {id: 5, name: "业务部", lv: 2, depart_id: 30002},
        {id: 6, name: "业务部", lv: 3, depart_id: 30002},
        {id: 7, name: "财务部", lv: 1, depart_id: 40001},//德化分公司
        {id: 8, name: "财务部", lv: 2, depart_id: 40001},
        {id: 9, name: "财务部", lv: 3, depart_id: 40001},
        {id: 10, name: "业务部", lv: 1, depart_id: 40002},
        {id: 11, name: "业务部", lv: 2, depart_id: 40002},
        {id: 12, name: "业务部", lv: 3, depart_id: 40002},
        {id: 13, name: "技术部", lv: 1, depart_id: 20000},//技术部
        {id: 14, name: "技术部", lv: 2, depart_id: 20000},//技术部
        {id: 15, name: "技术部", lv: 3, depart_id: 20000},//技术部
        {id: 18, name: "用户", lv: 1, depart_id: 10000},//用户
        {id: 18, name: "用户", lv: 2, depart_id: 10000},//用户
        {id: 18, name: "用户", lv: 3, depart_id: 10000},//用户
        {id: 16, name: "客户", lv: 1, depart_id: 3},//客户
        {id: 17, name: "客户", lv: 2, depart_id: 3},//客户
        {id: 18, name: "客户", lv: 3, depart_id: 3},//客户
    ]
    let user_ref = [
        {user_id: 3, depart_id: 10000, lv: 1},  //张三-用户
        {user_id: 3, depart_id: 30000, lv: 1},  //张三
        {user_id: 3, depart_id: 30001, lv: 2},  //张三
        {user_id: 4, depart_id: 10000, lv: 1},  //李四-用户
        {user_id: 4, depart_id: 40000, lv: 1},  //李四
        {user_id: 4, depart_id: 40001, lv: 2},  //李四
        {user_id: 5, depart_id: 10000, lv: 1},  //王五-用户
        {user_id: 5, depart_id: 20000, lv: 3},  //王五-技术部
        {user_id: 5, depart_id: 30000, lv: 1},  //王五-泉州
        {user_id: 5, depart_id: 30001, lv: 2},  //王五-泉州财务
        {user_id: 5, depart_id: 30002, lv: 3},  //王五-泉州业务
        {user_id: 5, depart_id: 40000, lv: 1},  //王五-德化
        {user_id: 5, depart_id: 40001, lv: 2},  //王五-德化财务
        {user_id: 5, depart_id: 40002, lv: 3},  //王五-德化业务
        {user_id: 6, depart_id: 3, lv: 1},  //赵六-客户
    ]
    let tb_order = [
        {name: "订单3维打印", user_id: 3},
        {name: "订单4个配件", user_id: 4},
    ]

    // 构造数据
    ////用户
    await db.tb_user.deleteMany();
    await db.tb_user.createMany({data: tb_user})
    ////部门
    await db.tb_depart.deleteMany();
    await db.tb_depart.createMany({data: tb_depart})

    ////
    await db.tb_depart.deleteMany();
    await db.tb_depart.createMany({data: tb_depart})


    // 菜单
    await db.tb_menu.deleteMany();
    await db.tb_menu.createMany({data: tb_menu})


    console.error('成功:初始化表');
}