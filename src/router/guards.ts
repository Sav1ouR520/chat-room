import NProgress from "nprogress"
import type { Router } from "vue-router"
import { setTitle } from "@/module"
import { TokenStore } from "@/stores"

NProgress.configure({ showSpinner: false, minimum: 0.1 })

const setupGlobalGuards = (router: Router) => {
  router.beforeEach((to, from) => {
    if (to.path !== from.path) NProgress.start()
    setTitle(String(to.name))
  })
  router.afterEach(() => NProgress.done())
}

const setupAuthority = (router: Router) => {
  const tokenStore = TokenStore()
  router.beforeEach((to, _, next) => {
    const hasAccessToken = !!tokenStore.accessToken
    if ((to.meta["verify"] && !hasAccessToken) || (!to.meta["verify"] && hasAccessToken)) {
      next({ name: to.meta["verify"] ? "login" : "main" })
    } else next()
  })
}

export { setupGlobalGuards, setupAuthority }
