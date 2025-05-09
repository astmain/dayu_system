
import config_pinia from '@src/config_pinia'
import app from '@src/layout/app.js'
import utils from '@src/utils'

let name = "BUS_depart"
let state = {
    // 共享数据==============================
    // 当前选中的部门id
    departs_id: 0,

    // 当前选中的部门用户列表
    users: [],


    // 共享方法==============================
    // 获取当前选中的部门用户列表
    find_user_info_list: async () => {
        let { users } = await BUS.api.tb_depart.find_user_info_list({ depart_id: BUS_depart.departs_id })
        BUS_depart.users = users
    },


    // 获取当前选中的部门用户列表
    departs_ParentIds: async () => {
        let { departs_tree } = await BUS.api.tb_depart.build_departs_tree()
        let ids = utils.tree_findParentIds(departs_tree, BUS_depart.departs_id)
        ids.push(BUS_depart.departs_id)
        return ids
    },








}




let persist = {
    //这里存储默认使用的是session
    enabled: true, strategies: [],
}



export default config_pinia({ app, name, state, persist })







