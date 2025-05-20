const {execSync} = require('child_process');


try {
    execSync('cd ./prisma/table && node make.js', {stdio: 'inherit'});
    execSync('npx prisma db push  ', {stdio: 'inherit'});
    execSync('cd ./prisma/table  && node make_data.js', {stdio: 'inherit'});
} catch (error) {
    console.error('执行失败:', error.message);
}