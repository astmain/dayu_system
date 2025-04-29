import app from './Layout/app.js'


// 注册全局状态store
// import tool_vue from "tool_vue"
let tool_vue = require("tool_vue")
let BUS = require('./BUS.js')
tool_vue.config_pinia({app: app, name: BUS.name, state: BUS.state, persist: BUS.persist})


// 注册axios拦截器               功能:全局axios,错误响应,取消网络请求 todo
let tool_web = require("tool_web")
tool_web.config_axios_api({name: 'axios_api', baseURL: 'http://127.0.0.1:3000', debug: false, timeout: 30000})

// 注册全局组件

// 注册多语言配置

// 注册路由                      功能:全部的路由,页面加载进度条 todo
// import config_routes from './routes/config_routes.js'
let config_routes = require("./routes/config_routes.js")
config_routes({app})


// 注册路由守卫                  功能:登陆拦截,权限拦截 todo

// 注册全局指令

// 配置全局错误处理              功能:字段状态 todo
app.mount('#app')









