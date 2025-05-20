let {PrismaClient} = require("@prisma/client")
const db = new PrismaClient()


make()

async function make() {
    // 查询用户及其角色数据
    let user_list = await db.tb_user.findMany({
        include: {tb_role: true}
    })
    console.log('查询用户及其角色数据:', JSON.stringify(user_list, null, 2))


    // 角色反查用户
    let role_user_list = await db.tb_role.findMany({
            where: {id: 1}, include: {tb_user: true}
    })
    console.log('角色反查用户:', JSON.stringify(role_user_list, null, 2))
}