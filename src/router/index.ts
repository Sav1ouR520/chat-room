import type { App } from "vue"
import { createRouter, createWebHistory } from "vue-router"
import { setupGlobalGuards, setupAuthority } from "@/router/guards"
import { routes } from "@/router/routes"

export const router = createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes })

export const setupRouter = (app: App) => {
  app.use(router)
  setupGlobalGuards(router)
  setupAuthority(router)
}
