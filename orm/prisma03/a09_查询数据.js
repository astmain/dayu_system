let {PrismaClient} = require("@prisma/client")
const db = new PrismaClient()


make()

async function make() {
    // 查询用户及其角色数据
    let user_list = await db.tb_user.findMany({
        include: {role: true}
    })
    console.log('查询用户及其角色数据:', JSON.stringify(user_list, null, 2))


    // 角色反查用户
    let role_user_list = await db.Role.findMany({
        where: {id: 1},
        include: {tb_user: true},
    })


    // 部门反向查用户
    let dept_list = await db.tb_depart.findMany({
        where: {id: 1},
        // include: {users: true },
        include: {
            tb_user: {
                include: {role: true}
            }
        },
    })

    console.log('部门反向查用户:', JSON.stringify(dept_list, null, 2))



    // 部门树查询
    let dept_tree = await db.tb_depart.findMany({
        // where: {deptName: "泉州分公司"},
        where: {id: 1},
        // // include: {users: true },
        include: {
            children: true,
            role: true,
            // children: {role: true}
        },
    })


    console.log('部门树查询:', JSON.stringify(dept_tree, null, 2))
}