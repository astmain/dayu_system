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

    const role_泉州财务部门_主管 = await prisma.tb_role.create({data: {name: '主管', remark: "泉州分公司-财务部-主管"}})


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
    let role_name = [{name: "主管"}, {name: "职员"},]
    let role_temp = []
    await prisma.tb_depart.create({
        data: {
            id: 1, name: "大宇三维打印",
            children: {
                create: [
                    {name: "泉州分公司",
                        children:{
                        create: [
                            {name: "财务部", children:{
                                create: [
                                    {name: "主管",is_depart:false, tb_role: {create: role_name}},
                                    {name: "职员",is_depart:false, tb_role: {create: role_name}},
                                ]
                            }},
                            {name: "业务部", children:{
                                create: [
                                    {name: "主管",is_depart:false, }
                                ]
                            }}
                        ]
                        } },
                    {name: "德化分公司",},
                ]
            }
        }
    })


// let depart_tree = await prisma.tb_depart.findMany({where: {name: "大宇三维打印"}, include: {children: true }})
    let depart_tree = await prisma.tb_depart.findMany({
        where: {name: "大宇三维打印"}, include: {
            children: children5
        }
    })
    console.log(`111---depart_tree:`, JSON.stringify(depart_tree, null, 2))


    let user1 = await prisma.tb_user.create({
        data: {
            username: "王一", tel: "111", tb_role: {connect: [{id: role_泉州财务部门_主管.id}]}
        }
    })


    let user2 = await prisma.tb_user.create({
        data: {
            username: "二狗", tel: "222", // tb_role: {connect: [{id: roleUser.id}]}
        }
    })

    let user3 = await prisma.tb_user.create({
        data: {
            username: "张三", tel: "333", // tb_role: {connect: [{id: roleUser.id}]}
        }
    })


    let user_list = await prisma.tb_user.findMany()
    console.log(`222---user_list:`, JSON.stringify(user_list, null, 2))


    console.log('数据初始化完成');


    // 帮我用 prisma 创建数据库表关系  .   用户表,部门表,角色表.      用户表 关联 角色表.   用户表 关联 部门表.      部门表 关联 角色表.
}

make()