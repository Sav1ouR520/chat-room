import "virtual:uno.css"
import "@unocss/reset/tailwind.css"
import "nprogress/nprogress.css"
import "vue-toastification/dist/index.css"
import "@/assets/main.css"

import { useRequestDevToolsPlugin } from "vue-hooks-plus"
import { createApp } from "vue"
import App from "@/App.vue"

import { setupStore } from "@/stores"
import { setupRouter } from "@/router"
import { setupI18n, setupToast } from "@/module"

const bootstrap = () => {
  const app = createApp(App)

  app.use(useRequestDevToolsPlugin)
  setupStore(app)
  setupRouter(app)
  setupI18n(app)
  setupToast(app)
  app.mount("#app")
}

bootstrap()
