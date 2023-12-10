import "virtual:uno.css"
import "@unocss/reset/tailwind.css"
import "@/assets/main.css"

import { useRequestDevToolsPlugin } from "vue-hooks-plus"
import { createApp } from "vue"
import App from "@/App.vue"

import { setupStore } from "@/stores"
import { setupRouter } from "@/router"
import { setupI18n } from "@/module"

const bootstrap = () => {
  const app = createApp(App)

  app.use(useRequestDevToolsPlugin)
  setupStore(app)
  setupI18n(app)
  setupRouter(app)

  app.mount("#app")
}

bootstrap()
