let {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()


async function make() {
    await require("./先清空重置数据库")()
// 1. 创建角色
    const adminRole = await prisma.role.create({
        data: {
            roleName: '系统管理员',
            roleKey: 'admin',
        },
    });

    const userRole = await prisma.role.create({
        data: {
            roleName: '普通用户',
            roleKey: 'user',
        },
    });

    const deptAdminRole = await prisma.role.create({
        data: {
            roleName: '部门管理员',
            roleKey: 'dept_admin',
        },
    });

    // 2. 创建部门并关联角色
    const hrDept = await prisma.dept.create({
        data: {
            deptName: '泉州分公司',
            role: { connect: { id: userRole.id }  },
            children:{
                create: [
                    {
                        deptName: '财务部',
                        role: { connect: { id: deptAdminRole.id } },
                    },
                    {
                        deptName: '人事部',
                        role: { connect: { id: deptAdminRole.id } },
                    },
                ],
            }
        },
        include: {
            // children: {
            //     include: {
            //         deptName:"财务部",
            //         role: { connect: { id: deptAdminRole.id } },
            //     },
            // },
        },
    });




    const itDept = await prisma.dept.create({
        data: {
            deptName: '信息技术部',
            role: { connect: { id: deptAdminRole.id } },
        },
    });

    // 3. 创建用户并关联部门和角色
    const adminUser = await prisma.user.create({
        data: {
            username: 'admin',
            role: { connect: { id: adminRole.id } },
            dept: { connect: { id: hrDept.id } },
        },
    });

    const user1 = await prisma.user.create({
        data: {
            username: 'user1',
            role: { connect: { id: userRole.id } },
            dept: { connect: { id: itDept.id } },
        },
    });

    const deptAdmin = await prisma.user.create({
        data: {
            username: 'dept_admin',
            role: { connect: { id: deptAdminRole.id } },
            dept: { connect: { id: itDept.id } },
        },
    });

    console.log('数据初始化完成:');
    console.log('- 角色:', { adminRole, userRole, deptAdminRole });
    console.log('- 部门:', { hrDept, itDept });
    console.log('- 用户:', { adminUser, user1, deptAdmin });

    console.log("数据创建完成！")



    // 帮我用 prisma 创建数据库表关系  .   用户表,部门表,角色表.      用户表 关联 角色表.   用户表 关联 部门表.      部门表 关联 角色表.
  }

make()