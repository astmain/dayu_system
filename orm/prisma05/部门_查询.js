let children5 = {
    include: {
        children: {
            include: {
                children: {
                    include: {
                        children: {
                            include: {
                                children: {
                                    include: {
                                        children: true
                                    }
                                }
                            }
                        }
                    }

                }
            }
        },
    }
}
async function make() {
    let {PrismaClient} = require("@prisma/client")
    let prisma = new PrismaClient()

    let depart_tree = await prisma.tb_depart.findMany({where: {id: 1}   ,include: {children: children5}})
    console.log(`111---depart_tree:`,     JSON.stringify(   depart_tree   ,null,2  )         )


    console.log('数据初始化完成');


    // 帮我用 prisma 创建数据库表关系  .   用户表,部门表,角色表.      用户表 关联 角色表.   用户表 关联 部门表.      部门表 关联 角色表.
}

make()