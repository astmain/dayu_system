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

/**
 * Builds a tree structure from a flat array of items with parent-child relationships
 * @param {Array} items - Array of items with id and parent_id properties
 * @param {Object} options - Configuration options
 * @param {string} options.idKey - The key name for the item's unique identifier (e.g., 'menu_id' or 'depart_id')
 * @param {string} options.parentKey - The key name for the parent reference (default: 'parent_id')
 * @param {string} options.childrenKey - The key name for the children array (default: 'children')
 * @param {any} options.rootParentId - The parent ID value that indicates root level items (default: 0)
 * @returns {Array} Tree structure with children arrays
 */
function build_tree(items, options = {}) {
    const {
        idKey,
        parentKey = 'parent_id',
        childrenKey = 'children',
        rootParentId = 0
    } = options;

    if (!idKey) {
        throw new Error('idKey is required in options');
    }

    // Create a map for quick lookups
    const itemMap = new Map();
    items.forEach(item => itemMap.set(item[idKey], item));

    // Function to build the tree recursively
    const buildBranch = (parentId) => {
        const branch = [];
        
        // Find all items that belong to the current parent
        const children = items.filter(item => item[parentKey] === parentId);
        
        // For each child, recursively build its subtree
        for (const child of children) {
            const node = {
                ...child,
                [childrenKey]: buildBranch(child[idKey])
            };
            branch.push(node);
        }
        
        return branch;
    };

    return buildBranch(rootParentId);
}

// Example usage:
// const menuTree = build_tree(tb_menu, { idKey: 'menu_id' });
// const departTree = build_tree(tb_depart, { idKey: 'depart_id' });

// Example with custom options:
// const customTree = build_tree(tb_menu, {
//     idKey: 'menu_id',
//     parentKey: 'parent_id',
//     childrenKey: 'subItems',
//     rootParentId: 0
// }); 