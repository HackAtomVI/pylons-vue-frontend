import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/Index.vue'
import Market from '@/views/Market.vue'
import Arena from '@/views/Arena.vue'
import Landing from '@/views/Landing.vue'
import Types from '@/views/Types.vue'
import Relayers from '@/views/Relayers.vue'
import Workshop from '@/views/Workshop.vue'
import Login from '@/views/Login.vue'
import Upload from '@/views/Upload.vue'

const routerHistory = createWebHistory()
const routes = [
  {
    path: '/',
    component: Landing,
  },
  { path: '/chain', componnt: Index },
  { path: '/types', component: Types },
  { path: '/market', component: Market },
  { path: '/arena', component: Arena },
  { path: '/relayers', component: Relayers },
  { path: '/workshop', component: Workshop },
  { path: '/login', component: Login },
  { path: '/upload', component: Upload },
]

const router = createRouter({
  history: routerHistory,
  routes,
})

export default router
