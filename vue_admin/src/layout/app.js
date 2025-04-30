import { createApp } from 'vue'
import App from '@src/layout/App.vue' 
import router from '@src/router/index.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
// app.mount('#app')


export default app