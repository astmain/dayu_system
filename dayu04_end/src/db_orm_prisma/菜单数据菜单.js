let {PrismaClient} = require("@prisma/client")
let prisma = new PrismaClient()

// a00_创建菜单()
module.exports = 菜单数据菜单
菜单数据菜单()

async function 菜单数据菜单() {
    let tb_menu = [
        {id: 1, menu: "首页", path: "/home",},
        {id: 2, menu: "关于", path: "/about",},
        {id: 3, menu: "设置", path: "/setting",},
        {id: 4, menu: "订单管理", path: "/order_manage",},
        {id: 5, menu: "权限管理", path: "/system",},//权限管理 5
        {id: 6, menu: "用户管理", path: "/user/user", parent_id: 5},
        {id: 7, menu: "菜单管理", path: "/menu/menu", parent_id: 5},
        // {id: 8, menu: "角色管理", path: "/role/role", parent_id: 5},
        {id: 9, menu: "部门角色管理", path: "/depart/depart", parent_id: 5},
        {id: 8801, menu: "商城订单3D打印", path: "/mall_order_3D_print",},
        {id: 8802, menu: "商城订单管理", path: "/mall_order_manage",},
        {id: 8803, menu: "商城材料管理", path: "/mall_materials_manage",},
        // 测试
        {id: 9999, menu: "测试", path: "/test",},
        {id: 10000, menu: "测试0_原始模版", path: "/test0", parent_id: 9999},
        {id: 10001, menu: "测试1_渲染器_动画", path: "/test1", parent_id: 9999},
        {id: 10002, menu: "测试2_轨迹_鼠标旋转", path: "/test2", parent_id: 9999},
        {id: 10003, menu: "测试3_OrbitControls", path: "/test3", parent_id: 9999},
        {id: 10004, menu: "测试4_绘制物件", path: "/test4", parent_id: 9999},
        {id: 10005, menu: "测试5_贴图自发光", path: "/test5", parent_id: 9999},
        {id: 10006, menu: "test6_高光_亚光_粗糙度_金属度", path: "/test6", parent_id: 9999},
        {id: 10007, menu: "test7_贴图皮肤", path: "/test7", parent_id: 9999},
        {id: 10008, menu: "test8_贴图皮肤2", path: "/test8", parent_id: 9999},
    ]
    await prisma.tb_menu.deleteMany()
    await prisma.tb_menu.createMany({data: tb_menu})

    console.log('成功:a00_创建菜单');


    // 帮我用 prisma 创建数据库表关系  .   用户表,部门表,角色表.      用户表 关联 角色表.   用户表 关联 部门表.      部门表 关联 角色表.
}

