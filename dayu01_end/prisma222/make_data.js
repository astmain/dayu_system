let {PrismaClient} = require("@prisma/client")
const db = new PrismaClient()
make_data()

async function make_data() {
    let tb_user = [
        {id: 1, username: '许鹏', tel: '111',},
        {id: 2, username: '二狗', tel: '222',},
        {id: 3, username: '张三', tel: '333',},
        {id: 4, username: '李四', tel: '444',},
        {id: 5, username: '王五', tel: '555',},
        {id: 6, username: '赵六', tel: '666',},
        {id: 7, username: '孙七', tel: '777',},
    ]
    let tb_depart = [
        {id: 1, depart: "大宇三维打印", parent_id: 0}, //总公司
        {id: 77777, depart: "客户", parent_id: 1},        //客户
        {id: 10000, depart: "内部人员", parent_id: 1},    //内部人员
        {id: 20000, depart: "技术部", parent_id: 1},  //技术部
        //
        {id: 30000, depart: "泉州分公司", parent_id: 1},//泉州分公司
        {id: 30001, depart: "财务部", parent_id: 30000},//财务部
        {id: 30002, depart: "业务部", parent_id: 30000},//业务部
        //
        {id: 40000, depart: "德化分公司", parent_id: 1},//德化分公司
        {id: 40001, depart: "财务部", parent_id: 40000},//财务部
        {id: 40002, depart: "业务部", parent_id: 40000},//业务部
    ]
    let tb_menu = [
        {id: 1, menu: "首页", path: "/home", parent_id: 0},
        {id: 2, menu: "关于", path: "/about", parent_id: 0},
        {id: 3, menu: "设置", path: "/setting", parent_id: 0},
        {id: 4, menu: "订单管理", path: "/order_manage", parent_id: 0},
        {id: 5, menu: "权限管理", path: "/system", parent_id: 0},//权限管理 5
        {id: 6, menu: "用户管理", path: "/user/user", parent_id: 5},
        {id: 7, menu: "菜单管理", path: "/menu/menu", parent_id: 5},
        {id: 666, menu: "商品管理", path: "/mall_goods", parent_id: 0},
        {id: 777, menu: "商城购物", path: "/mall_shop", parent_id: 0},
        {id: 888, menu: "购物订单", path: "/mall_order", parent_id: 0},
        {id: 999, menu: "购物车", path: "/mall_car", parent_id: 0},
    ]

    let ref_depart_user = [
        // 技术部
        {user_id: 1, depart_id: 20000},
        {user_id: 2, depart_id: 20000},
        // 财务部-业务部
        {user_id: 3, depart_id: 30001},
        {user_id: 4, depart_id: 30002},
        {user_id: 5, depart_id: 40001},
        {user_id: 6, depart_id: 40002},
        // 特殊情况用户-张三夸部门
        {user_id: 3, depart_id: 30002},
        {user_id: 3, depart_id: 40001},
        //客户
        {user_id: 7, depart_id: 77777},
    ]

   let ref_depart_role=[
        {role_id: 3, depart_id: 30000},
        {role_id: 1, depart_id: 10000},
        {role_id: 1, depart_id: 20000},
        {role_id: 1, depart_id: 30000},
        {role_id: 1, depart_id: 30001},
        {role_id: 1, depart_id: 30002},
        {role_id: 1, depart_id: 40000},
    ]


    // 构造数据
    ////用户
    await db.tb_user.deleteMany();
    await db.tb_user.createMany({data: tb_user})
    ////部门
    await db.tb_depart.deleteMany();
    await db.tb_depart.createMany({data: tb_depart})
    ////菜单
    await db.tb_menu.deleteMany();
    await db.tb_menu.createMany({data: tb_menu})
    ////关联-部门-用户
    await db.ref_depart_user.deleteMany();
    await db.ref_depart_user.createMany({data: ref_depart_user})


    console.error('成功:初始化表');
}