const {execSync} = require('child_process');
let {PrismaClient} = require("@prisma/client")
const {unlinkSync} = require("node:fs");
const db = new PrismaClient()
make_data()

async function make_data() {
    // 1删除数据库==========================================
    try {
        let path = "./dev.db"
        unlinkSync(path);
        console.log('成功:1删除数据库:', path);
        await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (err) {
        console.error('失败:1删除数据库:', err.message);
    }
    // 2生产数据库==============================================
    execSync('npx prisma db push  ', {stdio: 'inherit'})
    console.error('成功:2生产数据库')









    console.error('成功:3创建数据');
}