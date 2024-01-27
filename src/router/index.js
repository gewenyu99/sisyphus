import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import CreateAccount from '../views/CreateAccount.vue' // Import the CreateAccount component
import Boulders from '../views/Boulders.vue' // Import the Grinds component

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/create-account', // Add a path for CreateAccount
      name: 'create-account',
      component: CreateAccount
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/boulders', // Add a path for Grinds
      name: 'boulders',
      component: Boulders
    }
  ]
})

export default router