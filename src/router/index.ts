import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '@/views/Register.vue'
import Home from '@/views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/',
    name: 'home',
    component: Home
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
