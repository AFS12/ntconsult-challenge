import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Default from '../views/layouts/Default.vue'
import Home from '../views/home/Home.vue'
import HotelsList from '../views/hotels/HotelsList.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Default,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home,
      },
      {
        path: '/hotels',
        name: 'hotelsList',
        component: HotelsList,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
