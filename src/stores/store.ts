import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import { createPinia } from "pinia"
import type { App } from "vue"

const store = createPinia()

function setupStore(app: App) {
  store.use(piniaPluginPersistedstate)
  app.use(store)
}

export { setupStore, store }
