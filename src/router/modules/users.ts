import type { RouteRecordRaw } from 'vue-router'

export const usersRouter: RouteRecordRaw[] = [
  {
    path: '/users',
    name: 'users',
    component: () => import('@/views/users/index.vue'),
    meta: {
      requiresAuth: true,
      title: 'user'
    }
  }
]
