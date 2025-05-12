//用户表
//用户表  admin 1 二狗 2 张三 3 李四 4
//用户表  admin 1 二狗 2 张三 3 李四 4
let tb_user = [
    {id: 1, role: "管理员", uid: "1", username: "admin", password: "123456", nickname: "AD", avatar: "111", email: "11111111@qq.com", tel: "15160315111", order: 111, online: true, update_time: "2023-01-01 04:05:05", create_time: "2023-01-01 04:05:05", is_del: false, kind: "user",},
    {id: 2, role: "用户", uid: "2", username: "二狗", password: "123456", nickname: "小狗", avatar: "111", email: "2222222222@qq.com", tel: "15374118112", order: 111, online: true, update_time: "2023-01-01 05:05:05", create_time: "2023-01-01 05:05:05", is_del: false, kind: "user",},
    {id: 3, role: "用户", uid: "3", username: "张三", password: "123456", nickname: "小张", avatar: "111", email: "3333333333@qq.com", tel: "15374118113", order: 111, online: true, update_time: "2023-01-01 05:05:05", create_time: "2023-01-01 05:05:05", is_del: false, kind: "user",},
    {id: 4, role: "商家", uid: "4", username: "李四", password: "123456", nickname: "小李", avatar: "111", email: "4444444444@qq.com", tel: "15374118114", order: 111, online: true, update_time: "2023-01-01 04:05:05", create_time: "2023-01-01 04:05:05", is_del: false, kind: "user",},
    {id: 5, role: "财务", uid: "5", username: "王无", password: "123456", nickname: "小李", avatar: "111", email: "5555555555@qq.com", tel: "15374118115", order: 111, online: true, update_time: "2023-01-01 04:05:05", create_time: "2023-01-01 04:05:05", is_del: false, kind: "user",},
]
// 角色表
let tb_role = [
    {id: 1, role: "管理员",},
    {id: 2, role: "用户",},
    {id: 3, role: "商家",},
]
// 菜单表
let tb_menu = [
    {id: 1, menu: "首页", path: "/home", parent_id: 0},
    {id: 2, menu: "关于", path: "/about", parent_id: 0},
    {id: 3, menu: "订单管理", path: "/order_manage", parent_id: 0},
    {id: 4, menu: "权限管理", path: "/system", parent_id: 0},//有child 4
    {id: 5, menu: "用户管理", path: "/user/user", parent_id: 4},
    {id: 6, menu: "菜单管理", path: "/menu/menu", parent_id: 4},
    {id: 7, menu: "角色管理", path: "/role/role", parent_id: 4},
]





//关联-角色_菜单     // 管理员1 ,用户2 商家3
let role_menu = [
    {id: 1, role_id: 1, menu_id: 1}, //管理员   -首页
    {id: 2, role_id: 1, menu_id: 2}, //管理员   -关于
    {id: 3, role_id: 1, menu_id: 3}, //管理员   -订单管理
    {id: 4, role_id: 1, menu_id: 4}, //管理员   -权限管理
    {id: 5, role_id: 1, menu_id: 5}, //管理员   -用户管理
    {id: 6, role_id: 1, menu_id: 6}, //管理员   -菜单管理
    {id: 7, role_id: 1, menu_id: 7}, //管理员   -角色管理
    {id: 8, role_id: 2, menu_id: 1}, //用户     -首页
    {id: 9, role_id: 2, menu_id: 2}, //用户     -关于
    {id: 10, role_id: 3, menu_id: 3},//商家     -订单管理
]
//关联-角色_用户
let role_user = [
    {id: 1, role_id: 1, user_id: 1},//admin   -管理员
    {id: 2, role_id: 2, user_id: 1},//admin   -用户
    {id: 3, role_id: 2, user_id: 1},//admin   -商家
    {id: 4, role_id: 2, user_id: 2},//二狗    -用户
    {id: 5, role_id: 3, user_id: 2},//二狗    -商家
    {id: 6, role_id: 2, user_id: 3},//张三    -用户
    {id: 7, role_id: 3, user_id: 4},//李四    -商家
]


//部门表
let tb_depart = [
    {id: 1, depart: "大宇三维打印", parent_id: 0},//总公司
    {id: 2, depart: "技术部", parent_id: 1},//技术部
    {id: 3, depart: "普通用户", parent_id: 0},//普通用户

    //
    {id: 2001, depart: "泉州分公司", parent_id: 1},//泉州分公司
    {id: 20011, depart: "财务部", parent_id: 2001},//财务部
    {id: 20012, depart: "业务部", parent_id: 2001},//业务部
    //
    {id: 2002, depart: "德化分公司", parent_id: 1},//德化分公司
    {id: 20021, depart: "财务部", parent_id: 2002},//财务部
    {id: 20022, depart: "业务部", parent_id: 2002},//业务部
]


//关联-部门_用户        //用户表  admin 1 二狗 2 张三 3 李四 4
let depart_user = [
    {id: 1, depart_id: 2, user_id: 1},//admin
    {id: 2, depart_id: 20011, user_id: 2},//二狗
    {id: 3, depart_id: 20012, user_id: 3},//张三
    {id: 4, depart_id: 20021, user_id: 4},//李四
    {id: 5, depart_id: 20022, user_id: 5},//王五-------------
    {id: 9, depart_id: 2, user_id: 5},//王五
    {id: 10, depart_id: 3, user_id: 5},//王五
]

// 获取部门树,根据tb_depart
function buildDepartTree(departments) {
    // 创建一个映射来存储所有部门
    const departMap = new Map();
    const tree = [];

    // 首先将所有部门放入映射中
    departments.forEach(dept => {
        departMap.set(dept.id, {
            ...dept,
            children: []
        });
    });

    // 构建树结构
    departments.forEach(dept => {
        const node = departMap.get(dept.id);
        if (dept.parent_id === 0) {
            // 如果是根节点，直接添加到树中
            tree.push(node);
        } else {
            // 如果不是根节点，添加到父节点的children中
            const parent = departMap.get(dept.parent_id);
            if (parent) {
                parent.children.push(node);
            }
        }
    });

    return tree;
}

// 使用示例
const departTree = buildDepartTree(tb_depart);
console.log(JSON.stringify(departTree, null, 2));


