import {createApp} from 'vue'
import App from './App.vue'
import router from '../router.js'

let app = createApp(App)


import 'element-plus/dist/index.css'
import ElementPlus from "element-plus"

app.use(ElementPlus, {size: "small"})

app.app_router = router
app.use(router)
app.mount('#app')
export default app
