import type { RouteRecordRaw } from "vue-router"
import LoginPage from "@/views/LoginPage.vue"

export const routes: RouteRecordRaw[] = [
  {
    name: "login",
    path: "/",
    component: LoginPage,
  },
]
