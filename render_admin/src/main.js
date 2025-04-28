import app from './Layout/app.js'


// import tool_vue from "tool_vue"
let tool_vue = require("tool_vue")
let BUS = require('./BUS.js')
tool_vue.config_pinia({app: app, name: BUS.name, state: BUS.state, persist: BUS.persist})

