// import {PrismaClient} from "@prisma/client"
let {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient();


data = [
    {
        uid: "uid1",
        username: "admin",
        password: "123456",
        nickname: "admin_nickname",
        avatar: "111",
        email: "1311192345@qq.com",
        tel: "15160315110",
        order: 111,
        online: true,
        update_time: "2023-01-01 04:05:05",
        create_time: "2023-01-01 04:05:05",
        is_del: false,
        kind: "user",
        role: "admin",
    },

    {
    uid: "uid张三",
    username: "张三",
    password: "123456",
    nickname: "小张",
    avatar: "111",
    email: "12345678912@qq.com",
    tel: "12345678912",
    order: 111,
    online: true,
    update_time: "2023-01-01 05:05:05",
    create_time: "2023-01-01 05:05:05",
    is_del: false,
    kind: "user",
    role: "user",
},
    {
        uid: "uid李四",
        username: "李四",
        password: "123456",
        nickname: "小李",
        avatar: "111",
        email: "1172085478@qq.com",
        tel: "15374118110",
        order: 111,
        online: true,
        update_time: "2023-01-01 04:05:05",
        create_time: "2023-01-01 04:05:05",
        is_del: false,
        kind: "user",
        role: "user",
    },

]

async function run() {
    try {
        let result = await prisma.tb_user.createMany({data: data})
        console.log(`成功创建了 ${result.count} 条记录`);
    } catch (error) {
        console.error('批量创建记录时出错:',error);
        // console.error('批量创建记录时出错:', error);
    }


}

run();