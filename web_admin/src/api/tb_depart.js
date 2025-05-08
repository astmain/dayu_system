import { ElMessage } from "element-plus";
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
    find_menus_tree: async ({ depart_id, user_id }) => {
        let config = { method: "get", url: "/depart/find_departs_tree", params: { depart_id, user_id } }
        console.log('find_menus_tree---config:', config)
        const res = await axios_api(config)
        console.log('find_menus_tree---res:', res)
        let { departs_tree, departs_checked } = res.result
        return { departs_tree, departs_checked }
    },

    // 得到_部门-菜单-按钮
    find_depart_menu_btn: async ({ depart_id }) => {
        let config = { method: "get", url: "/depart/find_depart_menu_btn", params: { depart_id } }
        const res = await axios_api(config)
        console.log('find_depart_menu_btn---res:', res)
        let { depart_menu, depart_menu_btns } = res.result
        return { depart_menu, depart_menu_btns }

    },

    //添加_部门-权限
    add_depart_permission: async ({ item }) => {
        let config = { method: "post", url: "/depart/add_depart_permission", data: JSON.parse(JSON.stringify(item)) }
        console.log('add_depart_permission---config:', config)
        const res = await axios_api(config)
        console.log('add_depart_permission---res:', res)
        let { one } = res.result
        res.code === 200 ? ElMessage.success({ message: `添加成功`, duration: 2 * 1000, showClose: true }) : alert("数据错误")
        return { one }
    },





}



export default tb_depart