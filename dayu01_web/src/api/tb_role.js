let tb_role = {
    // 部门列表
    find_role_list: async () => {
        let config = { method: 'get', url: '/role/find_role_list' }
        console.log('config---:', config)
        const res = await axios_api(config)
        console.log('tb_role---find_role_list---:', res)
        return { role_list: res.result.role_list }
    },


    // 角色管理菜单
    find_role_ref_menu_tree: async () => {
        let config = { method: 'get', url: '/role/find_role_ref_menu_tree' }
        const res = await axios_api(config)
        console.log('tb_role---find_role_ref_menu_tree---:', res)
        return { role_ref_menu_tree: res.result.role_ref_menu_tree }
    },




    
}



export default tb_role

