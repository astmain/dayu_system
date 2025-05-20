let {PrismaClient} = require("@prisma/client")
const db = new PrismaClient()


make_data()

async function make_data() {

    // 插入公司
    await db.tb_depart.deleteMany();
    const depart1 = await db.tb_depart.create({data: {depart: '公司1'}});
    const depart2 = await db.tb_depart.create({data: {depart: '公司2'}});

    // 插入角色
    await db.tb_role.deleteMany();
    const roleAdmin = await db.tb_role.create({data: {role: '管理员'}});
    const roleUser = await db.tb_role.create({data: {role: '普通用户'}});


    // 插入菜单
    await db.tb_menu.deleteMany();
    const menu1 = await db.tb_menu.create({data: {menu: '首页'}});
    const menu2 = await db.tb_menu.create({data: {menu: '设置'}});

    // 插入用户
    tb_user = [{user_id: 1, username: '许鹏', tel: '13800138001', password: '123456',}, {user_id: 2, username: '二狗', tel: '13800138002', password: '123456',}, {user_id: 3, username: '张三', tel: '13800138003', password: '123456',}, {
        user_id: 4,
        username: '李四',
        tel: '13800138004',
        password: '123456',
    }, {user_id: 5, username: '王五', tel: '13800138005', password: '123456',},

    ]
    await db.tb_user.deleteMany();
    let user_list = await db.tb_user.createMany({data: tb_user})


    // 关联 depart_role
    const dr1 = await db.depart_role.create({data: {depart_id: depart1.depart_id, role_id: roleAdmin.role_id}})
    const dr2 = await db.depart_role.create({data: {depart_id: depart2.depart_id, role_id: roleUser.role_id}})


    // 关联 user_depart_role
    await db.user_depart_role.create({data: {user_id: 1, depart_id: depart1.depart_id, role_id: roleAdmin.role_id}})
    await db.user_depart_role.create({data: {user_id: 2, depart_id: depart2.depart_id, role_id: roleAdmin.role_id}})
    await db.user_depart_role.create({data: {user_id: 3, depart_id: depart1.depart_id, role_id: roleAdmin.role_id}})
    await db.user_depart_role.create({data: {user_id: 4, depart_id: depart1.depart_id, role_id: roleAdmin.role_id}})
    await db.user_depart_role.create({data: {user_id: 5, depart_id: depart1.depart_id, role_id: roleAdmin.role_id}})



    // 根据上传的数据帮我,查询数据 user_id=1 的菜单


    console.log(`成功:make_data`)
}
