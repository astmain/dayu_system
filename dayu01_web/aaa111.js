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
    {menu_id: 1, menu: "首页", path: "/home", parent_id: 0},
    {menu_id: 2, menu: "关于", path: "/about", parent_id: 0},
    {menu_id: 3, menu: "设置", path: "/setting", parent_id: 0},
    {menu_id: 4, menu: "订单管理", path: "/order_manage", parent_id: 0},
    {menu_id: 5, menu: "权限管理", path: "/system", parent_id: 0},//权限管理 5
    {menu_id: 6, menu: "用户管理", path: "/user/user", parent_id: 5},
    {menu_id: 7, menu: "菜单管理", path: "/menu/menu", parent_id: 5},
    {menu_id: 666, menu: "商品管理", path: "/mall_goods", parent_id: 0},
    {menu_id: 777, menu: "商城购物", path: "/mall_shop", parent_id: 0},
    {menu_id: 888, menu: "购物订单", path: "/mall_order", parent_id: 0},
    {menu_id: 999, menu: "购物车", path: "/mall_car", parent_id: 0},
]



// 递归方式构建树形结构
function build_tree({ arr, key_id="depart_id", key_parent="parent_id", parentId = 0 }) {
    // 找出所有parent_id等于传入parentId的部门
    arr= JSON.parse(JSON.stringify(arr));
    const children = arr.filter(dept => dept[key_parent] === parentId);

    // 如果没有子部门，返回空数组
    if (children.length === 0) {
        return [];
    }

    // 递归处理每个子部门
    return children.map(child => ({
        ...child,
        children: build_tree({ arr, parentId: child[key_id] })
    }));
}

// // // 生成树形结构
// const departmentTree = build_tree({ arr: tb_depart  ,key_id:"depart_id",key_parent:"parent_id"});
// console.log(JSON.stringify(departmentTree, null, 2));







// build_tree 帮我封装成通用代码  可以让 tb_menu 和 tb_depart 都可以使用






