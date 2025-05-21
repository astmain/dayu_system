let {PrismaClient} = require("@prisma/client")
let prisma = new PrismaClient()


async function make() {
    await require("./先清空重置数据库")()
    await require("./菜单数据菜单")()


    await new Promise((resolve) => setTimeout(resolve, 1000))


    // 1. 角色=================================================================
    const adminRole = await prisma.tb_role.create({
        data: {
            name: '系统管理员',
        },
    });

    const userRole = await prisma.tb_role.create({
        data: {
            name: '普通用户',

        },
    });

    const deptAdminRole = await prisma.tb_role.create({
        data: {
            name: '部门管理员',
        },
    });

    // 2. 部门=================================================================
    const hrDept = await prisma.tb_depart.create({
        data: {
            name: '泉州分公司', tb_role: {connect: {id: userRole.id}}, children: {
                create: [{name: '财务部', tb_role: {connect: {id: deptAdminRole.id}},}, {name: '人事部', tb_role: {connect: {id: deptAdminRole.id}},},],
            }
        }, include: {},
    });


    const itDept = await prisma.tb_depart.create({
        data: {
            name: '技术部', tb_role: {connect: {id: deptAdminRole.id}},
        },
    });

    // 3. 用户=================================================================
    const user1 = await prisma.tb_user.create({
        data: {
            username: '王一', tel: '111', tb_role: {connect: {id: adminRole.id}}, tb_depart: {connect: {id: hrDept.id}},
        },
    });
    //
    const user2 = await prisma.tb_user.create({
        data: {
            username: '二狗', tel: '222', tb_role: {connect: {id: userRole.id}}, tb_depart: {connect: {id: itDept.id}},
        },
    });
    const user3 = await prisma.tb_user.create({
        data: {
            username: '张三', tel: '333', tb_depart: {connect: {id: itDept.id}}, tb_role: {connect: {id: deptAdminRole.id}},

        },
    });

    console.log('数据初始化完成');


    // 帮我用 prisma 创建数据库表关系  .   用户表,部门表,角色表.      用户表 关联 角色表.   用户表 关联 部门表.      部门表 关联 角色表.
}

make()