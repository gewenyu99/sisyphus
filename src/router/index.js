import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import CreateAccount from '../views/CreateAccount.vue' // Import the CreateAccount component

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/create', // Add a path for CreateAccount
      name: 'create',
      component: CreateAccount
    },
  ]
})

export default router