function build_departs_tree(departments, key_id = "depart_id", key_parent = "parent_id") {
    // 创建一个映射来存储所有部门
    const departMap = new Map();
    const tree = [];

    // 首先将所有部门放入映射中
    departments.forEach(dept => {
        departMap.set(dept[key_id], {
            ...dept,
            children: [],
            // 自定义字段
            // value: dept.id,
            // label: dept.depart,

        });
    });

    // 构建树结构
    departments.forEach(dept => {
        const node = departMap.get(dept[key_id]);
        if (dept.parent_id === 0) {
            // 如果是根节点，直接添加到树中
            tree.push(node);
        } else {
            // 如果不是根节点，添加到父节点的children中
            const parent = departMap.get(dept[key_parent]);
            if (parent) {
                parent.children.push(node);
            }
        }
    });

    return tree;
}

let tb_depart = [
    { depart_id: 1, depart: "大宇三维打印", parent_id: 0 }, //总公司
    { depart_id: 3, depart: "客户", parent_id: 1 },        //客户
    { depart_id: 10000, depart: "用户", parent_id: 1 },    //用户
    { depart_id: 20000, depart: "技术部", parent_id: 1 },  //技术部
    //
    { depart_id: 30000, depart: "泉州分公司", parent_id: 1 },//泉州分公司
    { depart_id: 30001, depart: "财务部", parent_id: 30000 },//财务部
    { depart_id: 30002, depart: "业务部", parent_id: 30000 },//业务部
    //
    { depart_id: 40000, depart: "德化分公司", parent_id: 1 },//德化分公司
    { depart_id: 40001, depart: "财务部", parent_id: 40000 },//财务部
    { depart_id: 40002, depart: "业务部", parent_id: 40000 },//业务部
]
let tb_menu = [
    { menu_id: 0, menu: "大宇三维打印", path: "/大宇三维打印", parent_id: 11110 },
    { menu_id: 1, menu: "首页", path: "/home", parent_id: 0 },
    { menu_id: 2, menu: "关于", path: "/about", parent_id: 0 },
    { menu_id: 3, menu: "设置", path: "/setting", parent_id: 0 },
    { menu_id: 4, menu: "订单管理", path: "/order_manage", parent_id: 0 },
    { menu_id: 5, menu: "权限管理", path: "/system", parent_id: 0 },//权限管理 5
    { menu_id: 6, menu: "用户管理", path: "/user/user", parent_id: 5 },
    { menu_id: 7, menu: "菜单管理", path: "/menu/menu", parent_id: 5 },
    { menu_id: 666, menu: "商品管理", path: "/mall_goods", parent_id: 0 },
    { menu_id: 777, menu: "商城购物", path: "/mall_shop", parent_id: 0 },
    { menu_id: 888, menu: "购物订单", path: "/mall_order", parent_id: 0 },
    { menu_id: 999, menu: "购物车", path: "/mall_car", parent_id: 0 },
]


// console.log( JSON.stringify(build_departs_tree(tb_depart,key_id="depart_id",key_parent="parent_id"),null,2) );
console.log(JSON.stringify(build_departs_tree(tb_depart, key_id = "menu_id", key_parent = "parent_id"), null, 2));