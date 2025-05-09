import { ElMessage } from "element-plus";
let tb_depart = {
    // 得到_部门树
    find_departs_tree: async () => {
        const res = await axios_api({ method: "get", url: "/depart/find_departs_tree" })
        console.log('res---:', res)
        // res.code===200 ? ElMessage.success({ message: `添加成功`, duration: 3 * 1000, showClose: true }):0
        return { departs_tree: res.result.departs_tree }
    },






}



export default tb_depart