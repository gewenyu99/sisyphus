import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'

const app = createApp(App)
app.use(createPinia())

const auth = useAuthStore();

auth.init().then(() => {
  router.beforeEach((to, from, next) => {
    if ((to.name !== 'login' && to.name !== 'register') && auth.isLoggedIn !== true) {
      console.log('not logged in')
      next({ name: 'login' })
    } else if ((to.name === 'login' || to.name === 'register') && auth.isLoggedIn === true) {
      next({ path: '/' })
    }
    else {
      next()
    }
  })
  app.use(router)
  app.mount('#app')
})

