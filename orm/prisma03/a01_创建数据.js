let {PrismaClient} = require("@prisma/client")
let prisma = new PrismaClient()

// prisma = hook_prisma_filter_field(prisma)



// prisma.$use(async (params, next) => {
//     // if (params.model === "tb_role" && params.action === 'create') {
//     if (params.action === 'create') {
//         let tableName = params.model//表名
//         let col_list = await prisma.$queryRawUnsafe(` PRAGMA table_info(${tableName});`) //查询表的字段
//         console.log(`111---col_list:` ,` 表 ${tableName}`, col_list)
//         let col_key = col_list.map(o => o.name)//得到字段名
//         let args_data_old = JSON.parse(JSON.stringify(params.args.data)) //旧的数据
//         let args_data_new = {}//新的数据
//         for (const key in args_data_old) {
//             if (col_key.includes(key)) {
//                 args_data_new[key] = args_data_old[key]
//             }
//         }
//
//         //旧的数据替换成新的数据
//         params.args.data = args_data_new
//     }
//
//     return next(params); // 继续执行原始操作
// });



async function make() {
    await require("./先清空重置数据库")()
// 1. 创建角色
    const adminRole = await prisma.tb_role.create({
        data: {
            name: '系统管理员', aaa: 111
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

    // 2. 创建部门并关联角色
    const hrDept = await prisma.tb_depart.create({
        data: {
            name: '泉州分公司', tb_role: {connect: {id: userRole.id}}, children: {
                create: [{
                    name: '财务部', tb_role: {connect: {id: deptAdminRole.id}},
                }, {
                    name: '人事部', tb_role: {connect: {id: deptAdminRole.id}},
                },],
            }
        }, include: {},
    });


    const itDept = await prisma.tb_depart.create({
        data: {
            name: '信息技术部', tb_role: {connect: {id: deptAdminRole.id}},
        },
    });

    // 3. 创建用户并关联部门和角色
    const user1 = await prisma.tb_user.create({
        data: {
            username: '王一', tb_role: {connect: {id: adminRole.id}}, tb_depart: {connect: {id: hrDept.id}},
        },
    });
    //
    const user2 = await prisma.tb_user.create({
        data: {
            username: '二狗', tb_role: {connect: {id: userRole.id}}, tb_depart: {connect: {id: itDept.id}},
        },
    });
    const user3 = await prisma.tb_user.create({
        data: {
            username: '张三', tb_depart: {connect: {id: itDept.id}}, tb_role: {connect: {id: deptAdminRole.id}},

        },
    });

    console.log('数据初始化完成:');


    // 帮我用 prisma 创建数据库表关系  .   用户表,部门表,角色表.      用户表 关联 角色表.   用户表 关联 部门表.      部门表 关联 角色表.
}

make()