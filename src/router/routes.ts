import type { RouteRecordRaw } from "vue-router"
import login_page from "@/views/login-page.vue"

export const routes: RouteRecordRaw[] = [
  {
    name: "login",
    path: "/",
    component: login_page,
  },
]
