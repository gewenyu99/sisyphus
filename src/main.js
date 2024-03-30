import { createApp, Suspense } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useAppwriteStore } from './stores/appwrite'

import './assets/main.css'


const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
app.use(router)
const appwrite = useAppwriteStore()
await appwrite.init()
app.component('Suspense', Suspense) // Add this line
app.mount('#app')

