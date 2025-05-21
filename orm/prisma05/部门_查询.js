

async function make() {
    let {PrismaClient} = require("@prisma/client")
    let prisma = new PrismaClient()

    await prisma.tb_depart.findMany({where:{id:1}})




    console.log('数据初始化完成');


    // 帮我用 prisma 创建数据库表关系  .   用户表,部门表,角色表.      用户表 关联 角色表.   用户表 关联 部门表.      部门表 关联 角色表.
}

make()