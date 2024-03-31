import type { RouteRecordRaw } from 'vue-router'

export const cesiumRouter: RouteRecordRaw[] = [
  {
    path: '/cesium',
    name: 'Cesium',
    component: import('@/views/cesium/index.vue')
  }
]
