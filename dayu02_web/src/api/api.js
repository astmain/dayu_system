import { ElMessage } from "element-plus";

//查询_部门职位树
async function find_depart_position_tree() {
    let tag = "find_depart_position_tree"
    let config = { method: "get", url: "/auth/find_depart_position_tree" }
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({ message: res.msg, duration: 1 * 1000, showClose: true }) : 0
    return res.result.depart_position_tree
}

//查询_菜单树权限
async function find_menu_tree_permiss({position_id=0}) {
    let tag = "find_menu_tree_permiss"
    let config = { method: "get", url: "/auth/find_menu_tree_permiss",params:{position_id} }
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({ message: res.msg, duration: 1 * 1000, showClose: true }) : 0
    return res.result.menu_tree_permiss
}



//保存_职位_权限_数据
async function save_ref_position_permiss({position_id ,tree_data}) {
    let tag = "save_ref_position_permiss"
    let config = { method: "post", url: "/auth/save_ref_position_permiss",data:{position_id,tree_data} }
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({ message: res.msg, duration: 1 * 1000, showClose: true }) : 0
    return res.result.menu_tree_permiss
}











let api = {
    tb_depart: require("./tb_depart"),
    tb_user: require("./tb_user"),
    tb_menu: require("./tb_menu"),
    tb_role: require("./tb_role"),
    // 扁平化api=====================================
    find_depart_position_tree,
    find_menu_tree_permiss,
    save_ref_position_permiss,
}

window.api=api
export default api