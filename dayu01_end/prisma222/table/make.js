const fs = require('fs');


// 删除数据库
try {
    let path = "../dev.db"
    fs.unlinkSync(path);
    console.log('成功:删除数据库:', path);
} catch (err) {
    console.error('成功:删除数据库:', err.message);
}


// 生成schema==============================
const prisma_base = fs.readFileSync('./prisma_base.prisma', 'utf8') + "\n"
const test1_one_to_one_schema = fs.readFileSync('./test1_one_to_one_schema.prisma', 'utf8') + "\n"
schema = prisma_base + test1_one_to_one_schema
fs.writeFileSync("../schema.prisma", schema, 'utf8');
console.log(`生成schema.prisma文件成功`)





console.log(`生成schema.prisma文件成功`)











