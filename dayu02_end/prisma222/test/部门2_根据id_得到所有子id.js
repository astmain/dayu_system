let depart=[
    { id: 1, depart: '大宇三维打印', parent_id: 0 },
    { id: 2, depart: '技术部', parent_id: 1 },
    { id: 3, depart: '普通用户', parent_id: 0 },
    { id: 2001, depart: '泉州分公司', parent_id: 1 },
    { id: 2002, depart: '德化分公司', parent_id: 1 },
    { id: 20011, depart: '财务部', parent_id: 2001 },
    { id: 20012, depart: '业务部', parent_id: 2001 },
    { id: 20021, depart: '财务部', parent_id: 2002 },
    { id: 20022, depart: '业务部', parent_id: 2002 }
]

// 根据部门ID获取所有子部门ID和自身ID
function getAllChildIds(depart,departId) {
    const result = new Set([departId]); // 使用Set来存储唯一的ID
    
    // 递归查找所有子部门
    function findChildren(parentId) {
        const children = depart.filter(item => item.parent_id === parentId);
        children.forEach(child => {
            result.add(child.id);
            findChildren(child.id);
        });
    }
    
    findChildren(departId);
    return Array.from(result);
}

// 测试示例
console.log('部门ID 1的所有子部门ID和自身ID:', getAllChildIds(depart,1));