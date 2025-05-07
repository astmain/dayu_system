let tb_depart = {
    // 部门/菜单数据
    build_departs_tree: async () => {
        const res = await axios_api({ method: "post", url: "/depart/build_departs_tree" })
        console.log('res---:', res)
        // res.code===200 ? ElMessage.success({ message: `添加成功`, duration: 3 * 1000, showClose: true }):0
        return { departs_tree: res.result.departs_tree }
    },


    // 获取部门/菜单数据
    depart_opt: async () => {
        const res = await axios_api({ method: "post", url: "/depart/depart_opt" })
        // console.log('res---:', res)
        let { opt_list, opt_val } = res.result
        // console.log('opt_list, opt_val---:', opt_list, opt_val)
        return { opt_list, opt_val }
    },



    find_user_info_list: async ({ depart_id }) => {
        const res = await axios_api({ method: "post", url: "/depart/find_user_info_list", data: { depart_id: depart_id } })
        console.log('find_user_info_list---res:', res)
        return { users: res.result.users }
    },

    // 得到_部门树
    find_menus_tree: async ({ depart ,id}) => {
        const res = await axios_api({ method: "get", url: "/depart/find_departs_tree", data: { depart, id } })
        console.log('find_menus_tree---res:', res)
        return { departs_tree: res.result.departs_tree }
    },







}



export default tb_depart