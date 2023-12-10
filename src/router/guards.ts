import NProgress from "nprogress"
import type { Router } from "vue-router"
import { setTitle } from "@/module"
NProgress.configure({ showSpinner: false, minimum: 0.1 })

export function setupGlobalGuards(router: Router) {
  router.beforeEach((to, from) => {
    if (to.path !== from.path) NProgress.start()
    setTitle(String(to.name))
  })
  router.afterEach(() => NProgress.done())
}
