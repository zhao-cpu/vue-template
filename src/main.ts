import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import directives from '@/directives'

import 'virtual:uno.css'
import '@unocss/reset/tailwind-compat.css'

import App from './App.vue'
import router from './router'
import { setupIcons } from '@/icons/index'
setupIcons()
const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(directives)

app.mount('#app')
