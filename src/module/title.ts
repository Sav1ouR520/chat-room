import { i18n } from "@/module/i18n"
import { router } from "@/router"

const setTitle = (name = router.currentRoute.value.name) => {
  document.title = name ? i18n.global.t(String(name) + ".title") : document.title
}

export { setTitle }
