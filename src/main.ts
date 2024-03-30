import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAppwriteStore } from './stores/appwriteService'
import './assets/main.css'

const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
app.use(router)
const appwrite = useAppwriteStore()

;(async () => {
    await appwrite.init()
})()

app.mount('#app')
