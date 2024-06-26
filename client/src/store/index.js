// Utilities
import { markRaw } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
pinia.use(({store}) => {
    store.router = markRaw(router)
})
export default pinia
