let {PrismaClient} = require("@prisma/client")
let prisma = new PrismaClient()

// a00_创建菜单()
module.exports = 菜单数据菜单

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
        {id: 666, menu: "商品管理", path: "/mall_goods",},
        {id: 777, menu: "商城购物", path: "/mall_shop",},
        {id: 888, menu: "购物订单", path: "/mall_order",},
        // {id: 999, menu: "购物车", path: "/mall_car", parent_id: 0},
    ]
    await prisma.tb_menu.deleteMany()
    await prisma.tb_menu.createMany({data: tb_menu})

    console.log('成功:a00_创建菜单');


    // 帮我用 prisma 创建数据库表关系  .   用户表,部门表,角色表.      用户表 关联 角色表.   用户表 关联 部门表.      部门表 关联 角色表.
}

