let tb_menu = {
    // 部门/菜单数据


    find_menu_tree: async function () {
        let config = { method: 'get', url: '/menu/find_menu_tree', }
        console.log("find_menu_tree---", config)
        const res = await axios_api(config)
        console.log('tb_menu---find_menu_tree---:', res)
        return { menu_tree: res.result.menu_tree }
    },


    find_menu_tree_match_role_id: async function ({ role_id }) {
        let config = { method: 'get', url: '/menu/find_menu_tree_match_role_id', params: { role_id } }
        console.log("find_menu_tree---", config)
        const res = await axios_api(config)
        console.log('tb_menu---find_menu_tree---:', res)
        return res.result
    },


    update_ref_menu_permiss: async function ({ role_id, tree_data }) {
        let config = { method: 'post', url: '/menu/update_ref_menu_permiss', data: { role_id, tree_data } }
        console.log("update_ref_menu_permiss---", config)
        const res = await axios_api(config)
        console.log('tb_menu---update_ref_menu_permiss---:', res)
        return res.result
    }
}



export default tb_menu

