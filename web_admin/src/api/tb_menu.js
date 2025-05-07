let tb_menu = {
    // 部门/菜单数据
    find_list: async ({menu}) => {
        let config=  { method: 'post', url: '/menu/find_list', data: { menu: menu} }
        const res = await axios_api(config)
        console.log('tb_menu---find_list---:', res)
        return { departs_tree: res.result.departs_tree }
    },
}



export default tb_depart