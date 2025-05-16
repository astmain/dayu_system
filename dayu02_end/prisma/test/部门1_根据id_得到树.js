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
  

let id=1
// 获取部门树,数据depart  ,根据id

function build_depart_tree_by_id(departments, parentId) {
    const tree = [];
    
    // 找到所有直接子部门
    const children = departments.filter(dept => dept.parent_id === parentId);
    
    // 递归处理每个子部门
    for (const child of children) {
        const node = {
            ...child,
            children: build_depart_tree_by_id(departments, child.id)
        };
        tree.push(node);
    }
    
    return tree;
}

// 使用示例
const departmentTree = build_depart_tree_by_id(depart, id);
console.log("departmentTree-------------------", departmentTree)
console.log(JSON.stringify(departmentTree, null, 2));







