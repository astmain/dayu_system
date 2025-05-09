import { ElMessage } from "element-plus";
let tb_depart = {
    // 得到_部门树
    find_departs_tree: async () => {
        let tag = "find_departs_tree"
        let config = { method: "get", url: "/depart/find_departs_tree" }
        console.log(tag, 'config:', config)
        const res = await axios_api(config)
        console.log(tag, 'res:', res)
        res.code === 200 ? ElMessage.success({ message: res.msg, duration: 1 * 1000, showClose: true }) : 0
        return { departs_tree: res.result.departs_tree }
    },

    find_user_list_BY_depart_id: async ({ depart_id ,is_parent}) => {
        let tag = "find_user_list_BY_depart_id"
        let config = { method: "get", url: "/depart/find_user_list_BY_depart_id", params: { depart_id,is_parent } }
        console.log(tag, 'config:', config)
        const res = await axios_api(config)
        console.log(tag, 'res:', res)
        res.code === 200 ? ElMessage.success({ message: res.msg, duration: 1 * 1000, showClose: true }) : 0
        return { user_list: res.result.user_list }
    },







}



export default tb_depart