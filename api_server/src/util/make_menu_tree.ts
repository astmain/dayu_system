export default function make_menu_tree({username, tb_role, tb_menu, role_user, role_menu,}) {
    const userRoles = role_user.filter(ru => ru.username === username).map(ru => ru.role);
    // console.log(`111---userRoles:`, userRoles)
    const userMenus = role_menu.filter(rm => userRoles.includes(rm.role)).map(rm => rm.menu);
    // console.log(`222---userMenus:`, userMenus)
    const menus = tb_menu.filter(m => userMenus.includes(m.menu));

    // console.log(`333---fullMenus:`, fullMenus)

    function buildMenuTree(menus, parent = "") {
        return menus.filter(item => item.parent === parent)
            .map(item => ({
                id: item.id,
                menu: item.menu,
                path: item.path,
                children: buildMenuTree(menus, item.menu)
            }))
            .filter(item => item !== null);
    }
    return buildMenuTree(menus)
}

