import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Default from '../views/layouts/Default.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Default
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
