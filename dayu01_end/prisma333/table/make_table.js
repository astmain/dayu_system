const fs = require('fs');


// 删除数据库
try {
    let path = "../dev.db"
    fs.unlinkSync(path);
    console.log('成功:删除数据库:', path);
} catch (err) {
    console.error('失败:删除数据库:', err.message);
}


// 生成schema==============================
const prisma_base = fs.readFileSync('./prisma_base.prisma', 'utf8') + "\n"
const t01_ono_to_one = fs.readFileSync('./t01_ono_to_one.prisma', 'utf8') + "\n"
const t02_ono_to_duo = fs.readFileSync('./t02_ono_to_duo.prisma', 'utf8') + "\n"

schema = prisma_base + t01_ono_to_one + t02_ono_to_duo
fs.writeFileSync("../schema.prisma", schema, 'utf8');
console.log(`生成schema.prisma文件成功`)


console.log(`生成schema.prisma文件成功`)











