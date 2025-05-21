async function make() {
    await require("./先清空重置数据库")()
    let {PrismaClient} = require("@prisma/client")
    let prisma = new PrismaClient()
    // 1. 角色=================================================================
    const roleAdmin = await prisma.tb_role.create({
        data: {name: 'Admin'}
    })

    const roleUser = await prisma.tb_role.create({
        data: {name: 'User'}
    })

    const role_泉州财务部门_主管 = await prisma.tb_role.create({data: {name: '主管', title: "泉州分公司-财务部-主管"}})


    // 创建顶级部门
    const deptA = await prisma.tb_depart.create({
        data: {
            name: '大宇三维打印',
            // tb_role: {
            //     connect: [{id: roleAdmin.id}]
            // }
        }
    })

    // 创建子部门
    const deptB = await prisma.tb_depart.create({
        data: {
            name: '泉州分公司',
            parent_id: deptA.id,
            // tb_role: {
            //     connect: [{id: roleUser.id}]
            // }

            children: {
                create: [
                    {
                        name: '财务部',
                        // tb_role: {connect: [{id: ( await prisma.tb_role.create({data: {name: '主管' ,title:"泉州分公司-财务部-主管"}})   )  .id}]}
                    },


                    {
                        name: '业务部',
                        // tb_role: {connect: [{id: roleAdmin.id}]}
                        children: {
                            create: [
                                {
                                    name: '业务厂家部',
                                    // tb_role: {connect: [{id: roleAdmin.id}]}
                                },
                                {
                                    name: '业务电商部',
                                    // tb_role: {connect: [{id: roleAdmin.id}]}
                                },
                            ]
                        }
                    },
                ]
            }
        }
    })


    let depart_tree = await prisma.tb_depart.findMany({
        where: {name: "大宇三维打印"},
        include: {children: children5}
    })

    console.log(`111---depart_tree:`, JSON.stringify(depart_tree, null, 2))


    let user1 = await prisma.tb_user.create({
        data:{
            name:"张三",
            depart_id:deptB.id,
            tb_role:{connect:[{id:roleUser.id}]}
        }
    })

    let user_list = await prisma.tb_user.findMany()
    console.log(`222---user_list:`, JSON.stringify(user_list, null, 2))




    console.log('数据初始化完成');
    // 帮我用 prisma 创建数据库表关系  .   用户表,部门表,角色表.      用户表 关联 角色表.   用户表 关联 部门表.      部门表 关联 角色表.
}

make()