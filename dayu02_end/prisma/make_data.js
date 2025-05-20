const {execSync} = require('child_process');
let {PrismaClient} = require("@prisma/client")
const db = new PrismaClient()
make_data()

async function make_data() {
    execSync('npx prisma db push  ', {stdio: 'inherit'});



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
        {id: 1, name: "大宇三维打印", parent_id: 0}, //总公司
        {id: 77777, name: "客户", parent_id: 1},        //客户
        {id: 10000, name: "内部人员", parent_id: 1},    //内部人员
        {id: 20000, name: "技术部", parent_id: 1},  //技术部
        //
        {id: 30000, name: "泉州分公司", parent_id: 1},//泉州分公司
        {id: 30001, name: "财务部", parent_id: 30000},//财务部
        {id: 30002, name: "业务部", parent_id: 30000},//业务部
        //
        {id: 40000, name: "德化分公司", parent_id: 1},//德化分公司
        {id: 40001, name: "财务部", parent_id: 40000},//财务部
        {id: 40002, name: "业务部", parent_id: 40000},//业务部
    ]
    let tb_menu = [
        {id: 1, menu: "首页", path: "/home", parent_id: 0},
        {id: 2, menu: "关于", path: "/about", parent_id: 0},
        {id: 3, menu: "设置", path: "/setting", parent_id: 0},
        {id: 4, menu: "订单管理", path: "/order_manage", parent_id: 0},
        {id: 5, menu: "权限管理", path: "/system", parent_id: 0},//权限管理 5
        {id: 6, menu: "用户管理", path: "/user/user", parent_id: 5},
        {id: 7, menu: "菜单管理", path: "/menu/menu", parent_id: 5},
        // {id: 8, menu: "角色管理", path: "/role/role", parent_id: 5},
        {id: 9, menu: "部门设置职位", path: "/depart/depart", parent_id: 5},
        {id: 666, menu: "商品管理", path: "/mall_goods", parent_id: 0},
        {id: 777, menu: "商城购物", path: "/mall_shop", parent_id: 0},
        {id: 888, menu: "购物订单", path: "/mall_order", parent_id: 0},
        {id: 999, menu: "购物车", path: "/mall_car", parent_id: 0},
    ]


    ////用户
    await db.tb_user.deleteMany();
    await db.tb_user.createMany({data: tb_user})

    ////菜单
    await db.tb_menu.deleteMany();
    await db.tb_menu.createMany({data: tb_menu})

    // await db.ref_position.deleteMany();
    await db.tb_depart.deleteMany();
    let position_name = [{name: "主管"}, {name: "职员"},]
    let position = []
    await db.tb_depart.create({data: {id: 1, name: "大宇三维打印", parent_id: 0, ref_position: {create: position}}})
    // await db.tb_depart.create({data: {id: 2, name: "客户", parent_id: 1, ref_position: {create: position}}})
    // await db.tb_depart.create({data: {id: 3, name: "内部人员", parent_id: 1, ref_position: {create: position}}})
    await db.tb_depart.create({data: {id: 4, name: "技术部", parent_id: 1, ref_position: {create: position_name}}})

    await db.tb_depart.create({data: {id: 5, name: "泉州分公司", parent_id: 1, ref_position: {create: position}}})
    await db.tb_depart.create({data: {id: 6, name: "财务部", parent_id: 5, ref_position: {create: position}}})
    await db.tb_depart.create({data: {id: 7, name: "业务部", parent_id: 5, ref_position: {create: position}}})

    // await db.tb_depart.create({data: {id: 8, name: "德化分公司", parent_id: 1, ref_position: {create: position}}})
    // await db.tb_depart.create({data: {id: 9, name: "财务部", parent_id: 8, ref_position: {create: position}}})
    // await db.tb_depart.create({data: {id: 10, name: "业务部", parent_id: 8, ref_position: {create: position}}})
    //
    // await db.tb_depart.create({data: {id: 11, name: "厦门分公司", parent_id: 1, ref_position: {create: position}}})
    // await db.tb_depart.create({data: {id: 12, name: "财务部", parent_id: 11, ref_position: {create: position}}})
    // await db.tb_depart.create({data: {id: 13, name: "业务部", parent_id: 11, ref_position: {create: position}}})

    // 权限表
    let ref_permiss = [
        {menu_id: 0, position_id: 0, create: false, delete: false, update: false, find: false, view: false,},
    ]
    ////关联-职位权限
    await db.ref_position_permiss.deleteMany();
    await db.ref_position_permiss.createMany({data: ref_permiss})


    console.error('成功:初始化表');
}