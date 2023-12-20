// uno.config.ts
import { defineConfig, presetAttributify, presetUno, presetIcons } from "unocss"
import { presetForms } from "@julr/unocss-preset-forms"
import { presetExtra } from "unocss-preset-extra"

export default defineConfig({
  presets: [presetAttributify(), presetUno(), presetIcons(), presetForms(), presetExtra()],
})
