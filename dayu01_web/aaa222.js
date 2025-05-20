aaa=[
    { id: 1, depart: '大宇三维打印', parent_id: 0 },
    { id: 2, depart: '技术部', parent_id: 1 },
    { id: 3, depart: '普通用户', parent_id: 0 },
    { id: 2001, depart: '泉州分公司', parent_id: 1 },
    { id: 2002, depart: '德化分公司', parent_id: 1 },
    { id: 20011, depart: '财务部', parent_id: 2001 },
    { id: 20012, depart: '业务部', parent_id: 2001 },
    { id: 20021, depart: '财务部', parent_id: 2002 },
    { id: 20022, depart: '业务部', parent_id: 2002 },
    { id: 20023, depart: '总裁部', parent_id: 1 }
  ]


  //根据id   2001 得到所有父级 id   返回一个数组 

// 根据id获取所有父级id
function getAllParentIds(id, data) {
  const result = [];
  
  function findParents(currentId) {
    const current = data.find(item => item.id === currentId);
    if (current && current.parent_id !== 0) {
      result.push(current.parent_id);
      findParents(current.parent_id);
    }
  }
  
  findParents(id);

  result.push(id)
  return result;
}

// 测试获取ID 2001的所有父级ID
const parentIds = getAllParentIds(2001, aaa);
console.log('ID 2001的所有父级ID:', parentIds); // 输出: [1]
