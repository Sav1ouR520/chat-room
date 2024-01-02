import type { RouteRecordRaw } from "vue-router"

export const routes: RouteRecordRaw[] = [
  {
    name: "login",
    path: "/",
    meta: { verify: false },
    component: async () => await import("@/views/LoginPage.vue"),
  },
  {
    name: "register",
    path: "/register",
    meta: { verify: false },
    component: async () => await import("@/views/RegisterPage.vue"),
  },
  {
    name: "forge",
    path: "/forge",
    meta: { verify: false },
    component: async () => await import("@/views/ForgePage.vue"),
  },
  {
    name: "main",
    path: "/main",
    meta: { verify: true },
    component: async () => await import("@/views/MainPage.vue"),
    children: [{ name: "room", path: ":id", component: async () => await import("@/views/MainPage.vue") }],
  },
]
