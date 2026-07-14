import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 引入路由

const app = createApp(App)

app.use(router) // 必须有这一步来挂载路由
app.mount('#app')