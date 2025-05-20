import { ElMessage } from "element-plus";

//查询_部门职位树
async function find_permiss_depart_position_tree() {
    let tag = "find_permiss_depart_position_tree"
    let config = { method: "get", url: "/auth/find_permiss_depart_position_tree" }
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({ message: res.msg, duration: 1 * 1000, showClose: true }) : 0
    return res.result.depart_position_tree
}

//查询_菜单树权限
async function find_permiss_menu_tree({ position_id = 0 }) {
    let tag = "find_permiss_menu_tree"
    let config = { method: "get", url: "/auth/find_permiss_menu_tree", params: { position_id } }
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({ message: res.msg, duration: 1 * 1000, showClose: true }) : 0
    return res.result.menu_tree_permiss
}



//保存_职位_权限_数据
async function save_permiss_menu_position({ position_id, tree_data }) {
    let tag = "save_permiss_menu_position"
    let config = { method: "post", url: "/auth/save_permiss_menu_position", data: { position_id, tree_data } }
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({ message: res.msg, duration: 1 * 1000, showClose: true }) : 0
    return res.result.menu_tree_permiss
}




//更新_职位名称
async function update_position({ position_id, position }) {
    let tag = "update_position"
    let config = { method: "get", url: "/auth/update_position", params: { position_id, position } }
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({ message: res.msg, duration: 1 * 1000, showClose: true }) : 0
    return
}

//删除_职位
async function delete_position({ id }) {
    let tag = "delete_position"
    let config = { method: "get", url: "/auth/delete_position", params: { id } }
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({ message: res.msg, duration: 1 * 1000, showClose: true }) : 0
    return
}

//新增_职位
async function create_position({ name, id }) {
    let tag = "create_position"
    let config = { method: "get", url: "/auth/create_position", params: { name, id } }
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({ message: res.msg, duration: 1 * 1000, showClose: true }) : 0
    return
}

//组织=================================================================================

//新增_组织
async function create_depart({ depart, parent_id }) {
    let tag = "create_depart"
    let config = { method: "get", url: "/auth/create_depart", params: { depart, parent_id } }
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({ message: res.msg, duration: 1 * 1000, showClose: true }) : 0
    return
}


//删除_组织
async function delete_depart({ id }) {
    let tag = "delete_depart"
    let config = { method: "get", url: "/auth/delete_depart", params: { id } }
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({ message: res.msg, duration: 1 * 1000, showClose: true }) : 0
    return
}



//更新_组织
async function update_depart({ id, name }) {
    let tag = "update_depart"
    let config = { method: "get", url: "/auth/update_depart", params: { id, name } }
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({ message: res.msg, duration: 1 * 1000, showClose: true }) : 0
    return
}

//用户==================================================================

// 用户部门树
async function find_departs_tree({ id }) {
    let tag = "update_depart"
    let config = { method: "get", url: "/depart/find_departs_tree", params: { id } }
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({ message: res.msg, duration: 1 * 1000, showClose: true }) : 0
    return res.result.departs_tree
}




//查询_用户_根据部门id
async function find_user_by_depart_id({ depart_id }) {
    let tag = "find_user_by_depart_id"
    let config = { method: "get", url: "/user/find_user_by_depart_id", params: { depart_id } }
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({ message: res.msg, duration: 1 * 1000, showClose: true }) : 0
    return res.result
}


//新增_用户
async function create_user({ position_ids, username, tel }) {
    let tag = "create_user"
    let config = { method: "get", url: "/user/create_user", params: { position_ids, username, tel } }
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({ message: res.msg, duration: 1 * 1000, showClose: true }) : 0
    return
}

//修改_用户
async function update_user({ user_id, role_ids, username, tel }) {
    let tag = "update_user"
    let config = { method: "get", url: "/user/update_user", params:{ user_id, role_ids, username, tel } }
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({ message: res.msg, duration: 1 * 1000, showClose: true }) : 0
    return
}





//删除_用户
async function delete_user({ user_id }) {
    let tag = "delete_user"
    let config = { method: "get", url: "/user/delete_user", params: { user_id } }
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({ message: res.msg, duration: 1 * 1000, showClose: true }) : 0
    return
}



let api = {
    tb_depart: require("./tb_depart"),
    tb_user: require("./tb_user"),
    tb_menu: require("./tb_menu"),
    tb_role: require("./tb_role"),
    // 扁平化api=====================================
    find_permiss_depart_position_tree,
    find_permiss_menu_tree,
    save_permiss_menu_position,

    //职位
    update_position,
    delete_position,
    create_position,

    //组织
    create_depart,
    delete_depart,
    update_depart,


    //组织
    find_departs_tree,



    // 用户
    create_user,
    update_user,
    find_user_by_depart_id,
    delete_user,

}

window.api = api
export default api