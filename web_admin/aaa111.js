let data = [
    {
        "id": 1,
        "depart": "大宇三维打印",
        "parent_id": 0,
        "children": [
            {
                "id": 2,
                "depart": "技术部",
                "parent_id": 1,
                "children": [],
                "value": 2,
                "label": "技术部"
            },
            {
                "id": 2001,
                "depart": "泉州分公司",
                "parent_id": 1,
                "children": [
                    {
                        "id": 20011,
                        "depart": "财务部",
                        "parent_id": 2001,
                        "children": [],
                        "value": 20011,
                        "label": "财务部"
                    },
                    {
                        "id": 20012,
                        "depart": "业务部",
                        "parent_id": 2001,
                        "children": [],
                        "value": 20012,
                        "label": "业务部"
                    }
                ],
                "value": 2001,
                "label": "泉州分公司"
            },
            {
                "id": 2002,
                "depart": "德化分公司",
                "parent_id": 1,
                "children": [
                    {
                        "id": 20021,
                        "depart": "财务部",
                        "parent_id": 2002,
                        "children": [],
                        "value": 20021,
                        "label": "财务部"
                    },
                    {
                        "id": 20022,
                        "depart": "业务部",
                        "parent_id": 2002,
                        "children": [],
                        "value": 20022,
                        "label": "业务部"
                    }
                ],
                "value": 2002,
                "label": "德化分公司"
            },
            {
                "id": 20023,
                "depart": "总裁部",
                "parent_id": 1,
                "children": [],
                "value": 20023,
                "label": "总裁部"
            }
        ],
        "value": 1,
        "label": "大宇三维打印"
    },
    {
        "id": 3,
        "depart": "普通用户",
        "parent_id": 0,
        "children": [],
        "value": 3,
        "label": "普通用户"
    }
]

// 根据 id 得到他的父级 id
function tree_find_parent_id({ id, tree }) {
    // 遍历顶层数据
    for (let item of tree) {
        // 如果当前项就是目标ID，返回其parent_id
        if (item.id === id) {
            return item.parent_id;
        }
        // 如果有子项，递归搜索
        if (item.children && item.children.length > 0) {
            const parentId = tree_find_parent_id({ id: id, tree: item.children });
            if (parentId !== undefined) {
                return parentId;
            }
        }
    }
    return undefined;
}

// 测试：查找ID为2的父级ID


console.log(tree_find_parent_id({ id: 20021, tree: data })); // 输出: 1 