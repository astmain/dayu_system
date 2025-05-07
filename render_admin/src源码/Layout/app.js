import {createApp} from 'vue'
import App from './App.vue'

let app = createApp(App)
import 'element-plus/dist/index.css'
import ElementPlus from "element-plus"

app.use(ElementPlus, {size: "small"})
export default app
