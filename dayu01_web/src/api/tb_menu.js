let tb_menu = {
    // 部门/菜单数据
    find_list: async ({ menu = "" }) => {
        let config = { method: 'post', url: '/menu/find_list', data: { menu: menu } }
        const res = await axios_api(config)
        console.log('tb_menu---find_list---:', res)
        return { departs_tree: res.result.departs_tree }
    },

    find_menus_tree: async function ({ menu = "" }) {
        let config = { method: 'get', url: '/menu/find_menus_tree', data: { menu } }
        const res = await axios_api(config)
        console.log('tb_menu---find_menus_tree---:', res)
        return { menus_tree: res.result.menus_tree }
    },
}



export default tb_menu

