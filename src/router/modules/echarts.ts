import type { RouteRecordRaw } from 'vue-router'

export const echartsRouter: RouteRecordRaw[] = [
  {
    path: '/echarts',
    name: 'echarts',
    component: () => import('@/views/echarts/index.vue'),
    meta: {
      requiresAuth: true,
      title: 'user'
    }
  }
]
