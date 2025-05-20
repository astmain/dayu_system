let {PrismaClient} = require("@prisma/client")
const db = new PrismaClient()


async function make() {
    await require("./先清空重置数据库")()
    await db.tb_role.create({data: {id: 1, name: "管理员",}})
    await db.tb_role.create({data: {id: 2, name: "普通用户",}})
    await db.tb_user.create({data: {username: "张三", tel: "333", tb_role: {connect: [{id: 1}  ,{id: 2} ]}}})


    console.log("数据创建完成！")
    await db.$disconnect()
}

make()