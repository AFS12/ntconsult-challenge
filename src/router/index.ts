import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Default from '../views/layouts/Default.vue'
import Home from '../views/home/Home.vue'
import HotelsList from '../views/hotels-list/HotelsList.vue'
import HotelDetails from '@/views/hotel-details/HotelDetails.vue'

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
      {
        path: '/hotel/:id',
        name: 'hotelDetails',
        component: HotelDetails,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
