




async function 先清空重置数据库() {
    const {execSync} = require('child_process');
    const {unlinkSync} = require("node:fs");
    // 1删除数据库==========================================
    try {
        let path = "./dev.db"
        unlinkSync(path);
        console.log('成功:1删除数据库:', path);
    } catch (err) {
        console.error('失败:1删除数据库:', err.message);
    }
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // 2生产数据库==============================================
    // execSync('npx prisma db push    ', {stdio: 'inherit'})
    execSync('npx prisma db push    --schema=./table.prisma ', {stdio: 'inherit'})
    console.error('成功:2生产数据库')


    console.error('成功:3创建数据');
}

module.exports = 先清空重置数据库
