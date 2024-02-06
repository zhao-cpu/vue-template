import type { RouteRecordRaw } from 'vue-router'

export const errorRouter: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: import('@/views/not-found/index.vue')
  }
]
