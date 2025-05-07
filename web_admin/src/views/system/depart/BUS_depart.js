
import config_pinia from '@src/config_pinia'
import app from '@src/layout/app.js'


let name = "BUS_depart"
let state = {
    // 当前选中的部门id
    departs_id: 0,

    // 当前选中的部门用户列表
    users: [],



    
}




let persist = {
    //这里存储默认使用的是session
    enabled: true, strategies: [],
}



export default config_pinia({ app, name, state, persist })







