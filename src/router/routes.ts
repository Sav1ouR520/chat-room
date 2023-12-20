import type { RouteRecordRaw } from "vue-router"

export const routes: RouteRecordRaw[] = [
  {
    name: "login",
    path: "/",
    component: async () => await import("@/views/LoginPage.vue"),
  },
  {
    name: "register",
    path: "/register",
    component: async () => await import("@/views/RegisterPage.vue"),
  },
]
