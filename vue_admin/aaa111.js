aaa=[
    {
        "path": "/",
        "redirect": "/login"
    },
    {
        "path": "/login",
        "name": "登陆"
    },
    {
        "path": "/:catchAll(.*)",
        "name": "NotFound"
    },
    {
        "path": "/",
        "name": "main",
        "children": [
            {
                "path": "/home",
                "name": "首页"
            },
            {
                "path": "/about",
                "name": "关于"
            },
            {
                "path": "/system",
                "name": "权限管理",
                "children": [
                    {
                        "path": "/system/user",
                        "name": "用户管理"
                    },
                    {
                        "path": "/system/menu",
                        "name": "菜单管理"
                    },
                    {
                        "path": "/system/role",
                        "name": "角色管理"
                    }
                ]
            }
        ]
    }
]

//遍历数据并添加menu字段
function addMenuField(data) {
    if (Array.isArray(data)) {
        return data.map(item => addMenuField(item));
    } else if (typeof data === 'object' && data !== null) {
        const newItem = { ...data };
        if (newItem.name) {
            newItem.menu = newItem.name;
        }
        if (newItem.children) {
            newItem.children = addMenuField(newItem.children);
        }
        return newItem;
    }
    return data;
}

const result = addMenuField(aaa);
console.log(JSON.stringify(result, null, 2));






