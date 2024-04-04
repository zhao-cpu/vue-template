import HomeView from '@/views/home/index.vue'
import type { RouteRecordRaw } from 'vue-router'

export const homeRouter: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about/:id',
    name: 'about',
    component: () => import('@/views/about/index.vue')
  },
  {
    path: '/demo',
    name: 'demo',
    component: () => import('@/views/demo/index.vue')
  }
]
