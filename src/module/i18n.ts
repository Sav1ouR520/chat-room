import messages from "@intlify/unplugin-vue-i18n/messages"
import type { App } from "vue"
import { createI18n } from "vue-i18n"
import { useStorage } from "@vueuse/core"
import { DEFAULT_LANGUAGE } from "@/types"
import { setTitle } from "@/module"

const i18n = createI18n({
  legacy: false,
  locale: navigator.language,
  fallbackLocale: DEFAULT_LANGUAGE,
  messages,
})

const setupI18n = (app: App) => {
  app.use(i18n)
}

const mountI18n = () => {
  const language = useStorage("language", DEFAULT_LANGUAGE)
  const { locale } = useI18n()
  onMounted(() => (locale.value !== language.value ? language.value : locale.value))
  watch(locale, locale => {
    language.value = locale
    setTitle()
  })
}

export { i18n, setupI18n, mountI18n }
