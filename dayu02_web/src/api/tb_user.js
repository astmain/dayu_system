import { ElMessage } from "element-plus";
let tb_user = {
    // 删除用户_根据id
    delete: async ({ id }) => {
        const res = await axios_api({ method: "post", url: "/user/delete", data: { id: id } })
        console.log('res---:', res)
        res.code === 200 ? ElMessage.success({ message: `添加成功`, duration: 3 * 1000, showClose: true }) : 0
        return res
    },


    add: async ({ tel, username, depart_id }) => {
        let config = { method: "post", url: "/user/add", data: { tel, username, depart_id } }
        const res = await axios_api(config)
        console.log('res---:', res)
        res.code === 200 ? ElMessage.success({ message: `添加成功`, duration: 3 * 1000, showClose: true }) : 0
        return res
    },


    update: async ({ id, tel, username, depart_ids }) => {
        let config = { method: "post", url: "/user/update", data: { id, tel, username, depart_ids } }
        const res = await axios_api(config)
        console.log('res---:', res)
        res.code === 200 ? ElMessage.success({ message: `添加成功`, duration: 3 * 1000, showClose: true }) : 0
        return res
    },

    // 用户部门关系
    find_user_info_depart: async ({ id }) => {
        let config = { method: "post", url: "/user/find_user_info_depart", data: { id } }
        const res = await axios_api(config)
        console.log('find_user_info_depart---res:', res)
        let { opt_val, opt_list } = res.result
        return { opt_val, opt_list }
    },



    // 新的-----------------
    find_user_list: async ({ depart_id = 0 }) => {
        let config = { method: "get", url: "/user/find_user_list", params: { depart_id } }
        console.log('config:', config)
        const res = await axios_api(config)
        console.log('find_user_list---res:', res)
        let { user_list } = res.result
        return { user_list }
    },




}



export default tb_user