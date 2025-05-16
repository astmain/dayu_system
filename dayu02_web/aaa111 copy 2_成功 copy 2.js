aaa=[
    {
        "id": 1,
        "menu": "首页",
        "path": "/home",
        "add": true,
        "del": true,
        "update": true,
        "find": true,
        "view": true,
        "parent_id": 0,
        "name": "首页",
        "path_full": "/home"
    },
    {
        "id": 2,
        "menu": "关于",
        "path": "/about",
        "add": true,
        "del": true,
        "update": true,
        "find": true,
        "view": true,
        "parent_id": 0,
        "name": "关于",
        "path_full": "/about"
    },
    {
        "id": 3,
        "menu": "设置",
        "path": "/setting",
        "add": true,
        "del": true,
        "update": true,
        "find": true,
        "view": true,
        "parent_id": 0,
        "name": "设置",
        "path_full": "/setting"
    },
    {
        "id": 4,
        "menu": "订单管理",
        "path": "/order_manage",
        "add": false,
        "del": false,
        "update": false,
        "find": false,
        "view": false,
        "parent_id": 0,
        "name": "订单管理",
        "path_full": "/order_manage"
    },
    {
        "id": 5,
        "menu": "权限管理",
        "path": "/system",
        "add": false,
        "del": false,
        "update": false,
        "find": false,
        "view": false,
        "parent_id": 0,
        "children": [
            {
                "id": 6,
                "menu": "用户管理",
                "path": "/user/user",
                "add": false,
                "del": false,
                "update": false,
                "find": false,
                "view": false,
                "parent_id": 5,
                "name": "用户管理",
                "path_full": "/system/user/user"
            },
            {
                "id": 7,
                "menu": "菜单管理",
                "path": "/menu/menu",
                "add": false,
                "del": false,
                "update": false,
                "find": false,
                "view": false,
                "parent_id": 5,
                "name": "菜单管理",
                "path_full": "/system/menu/menu"
            },
            {
                "id": 8,
                "menu": "角色管理",
                "path": "/role/role",
                "add": false,
                "del": false,
                "update": false,
                "find": false,
                "view": false,
                "parent_id": 5,
                "name": "角色管理",
                "path_full": "/system/role/role"
            }
        ],
        "name": "权限管理",
        "path_full": "/system"
    },
    {
        "id": 666,
        "menu": "商品管理",
        "path": "/mall_goods",
        "add": false,
        "del": false,
        "update": false,
        "find": false,
        "view": false,
        "parent_id": 0,
        "name": "商品管理",
        "path_full": "/mall_goods"
    },
    {
        "id": 777,
        "menu": "商城购物",
        "path": "/mall_shop",
        "add": false,
        "del": false,
        "update": false,
        "find": false,
        "view": false,
        "parent_id": 0,
        "name": "商城购物",
        "path_full": "/mall_shop"
    },
    {
        "id": 888,
        "menu": "购物订单",
        "path": "/mall_order",
        "add": false,
        "del": false,
        "update": false,
        "find": false,
        "view": false,
        "parent_id": 0,
        "name": "购物订单",
        "path_full": "/mall_order"
    },
    {
        "id": 999,
        "menu": "购物车",
        "path": "/mall_car",
        "add": false,
        "del": false,
        "update": false,
        "find": false,
        "view": false,
        "parent_id": 0,
        "name": "购物车",
        "path_full": "/mall_car"
    }
]

/**
 * 将树形菜单数据平坦化
 * @param {Array} treeData - 树形菜单数据
 * @returns {Array} - 平坦化后的菜单数据
 */
function build_tree_flat(treeData) {
    const result = [];
    
    function flatten(items) {
        items.forEach(item => {
            // 创建新对象，不包含children属性
            const { children, ...rest } = item;
            result.push(rest);
            
            // 如果有子节点，递归处理
            if (children && children.length > 0) {
                flatten(children);
            }
        });
    }
    
    flatten(treeData);
    return result;
}

// 使用示例
const flattenedData = build_tree_flat(aaa);
console.log('平坦化后的数据:', flattenedData);
