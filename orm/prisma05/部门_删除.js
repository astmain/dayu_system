async function make() {

    let {PrismaClient} = require("@prisma/client")
    let prisma = new PrismaClient()
    let 删除_部门 = await prisma.tb_depart.deleteMany({where:{id:4}})




    console.log('成功:部门_删除');

    // 帮我用 prisma 创建数据库表关系  .   用户表,部门表,角色表.      用户表 关联 角色表.   用户表 关联 部门表.      部门表 关联 角色表.
}

make()