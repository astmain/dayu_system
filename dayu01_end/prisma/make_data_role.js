let {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
seedData()
async function seedData() {
    // 创建公司
    const companyHQ = await prisma.company.create({
        data: {name: "总公司"}
    });

    const companyQZ = await prisma.company.create({
        data: {name: "泉州分公司"}
    });

    const companyDH = await prisma.company.create({
        data: {name: "德化分公司"}
    });

    // 创建部门
    const deptTech = await prisma.department.create({
        data: {name: "技术部", companyId: companyHQ.id}
    });

    const deptFinanceQZ = await prisma.department.create({
        data: {name: "财务部", companyId: companyQZ.id}
    });

    const deptBusinessQZ = await prisma.department.create({
        data: {name: "业务部", companyId: companyQZ.id}
    });

    const deptFinanceDH = await prisma.department.create({
        data: {name: "财务部", companyId: companyDH.id}
    });

    // 创建职位
    const posManager = await prisma.position.create({
        data: {name: "主管", departmentId: deptTech.id}
    });

    const posDeputyManager = await prisma.position.create({
        data: {name: "副主管", departmentId: deptTech.id}
    });

    const posStaff = await prisma.position.create({
        data: {name: "职员", departmentId: deptTech.id}
    });

    // 依此类推创建其他部门的职位...

    // 创建角色
    const roleTechManager = await prisma.role.create({
        data: {name: "技术部-主管"}
    });

    // 建立角色-职位关联
    await prisma.rolePosition.create({
        data: {
            roleId: roleTechManager.id,
            positionId: posManager.id
        }
    });

    // 依此类推建立其他角色与职位的关联...
}