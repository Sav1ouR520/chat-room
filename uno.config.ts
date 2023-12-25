// uno.config.ts
import { defineConfig, presetAttributify, presetUno, presetIcons } from "unocss"
import { presetForms } from "@julr/unocss-preset-forms"
import { presetExtra } from "unocss-preset-extra"

export default defineConfig({
  presets: [presetAttributify(), presetUno(), presetIcons(), presetForms(), presetExtra()],
  rules: [
    ["box-shadow-black", { "box-shadow": "0px 0px 15px 5px rgba(0, 0, 0, 0.2)" }],
    ["box-shadow-white", { "box-shadow": "0px 0px 15px 5px rgba(255, 255, 255, 0.8)" }],
  ],
})
