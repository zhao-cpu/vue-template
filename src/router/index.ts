import { createRouter, createWebHistory } from 'vue-router'
import { homeRouter, usersRouter, errorRouter } from '@/router/modules'
import { useTitle } from '@vueuse/core'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [...homeRouter, ...usersRouter, ...errorRouter],
  scrollBehavior(_, __, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  next()
})

router.afterEach((to) => {
  useTitle(to.meta.title)
})

export default router
