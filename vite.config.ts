// vite.config.ts
import { fileURLToPath, URL } from "node:url"
import { defineConfig, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "node:path"

// i18n、mock、UnoCSS
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite"
import MockDevServerPlugin from "vite-plugin-mock-dev-server"
import UnoCSS from "unocss/vite"

// 自动导入插件
import Icons from "unplugin-icons/vite"
import IconsResolver from "unplugin-icons/resolver"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { VueHooksPlusResolver } from "@vue-hooks-plus/resolvers"

// 分析/优化工具
import Inspector from "unplugin-vue-inspector/vite"
import Inspect from "vite-plugin-inspect"
import VueDevTools from "vite-plugin-vue-devtools"
import TsconfigPaths from "vite-tsconfig-paths"
import removeConsole from "vite-plugin-remove-console"
import "dotenv/config"

// 文件上传提示
import { Stream } from "node:stream"
interface Part extends Stream {
  name: string | null
  originalFilename: string | null
  mimetype: string | null
}
import { faker } from "@faker-js/faker"

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), "")
  return {
    base: env.VITE_BASE_URL || env.BASE_URL,
    plugins: [
      vue(),

      // https://github.com/webfansplz/vite-plugin-vue-devtools
      VueDevTools(),

      // https://github.com/webfansplz/vite-plugin-vue-inspector
      Inspector({
        enabled: true,
        toggleButtonVisibility: "always",
      }),

      // https://github.com/aleclarson/vite-tsconfig-paths
      TsconfigPaths(),

      // https://github.com/unplugin/unplugin-vue-components
      Components({
        dts: "src/d.ts/components.d.ts",
        deep: true,
        dirs: ["src/components"],
        resolvers: [IconsResolver({ prefix: "Icon" })],
      }),

      // https://github.com/unplugin/unplugin-auto-import
      AutoImport({
        imports: ["vue", "vue-router", "pinia", "vue-i18n", "@vueuse/core", "vee-validate"],
        resolvers: [VueHooksPlusResolver()],
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: "src/d.ts/auto-imports.d.ts",
      }),

      // https://github.com/unplugin/unplugin-icons
      Icons({ autoInstall: true }),

      // https://github.com/xiaoxian521/vite-plugin-remove-console
      removeConsole(),
      command === "build" && Inspect(),

      // https://github.com/intlify/bundle-tools
      VueI18nPlugin({
        runtimeOnly: true,
        compositionOnly: true,
        fullInstall: true,
        include: [path.resolve(__dirname, "./locales/**")],
      }),

      // https://github.com/unocss/unocss
      UnoCSS({ configFile: "uno.config.ts" }),

      // https://github.com/pengzhanbo/vite-plugin-mock-dev-server
      MockDevServerPlugin({
        wsPrefix: ["/api"],
        formidableOptions: {
          filename: (name: string, ext: string, part: Part) => {
            return part.name + "-" + faker.string.uuid() + "." + part.mimetype?.split("/")[1]
          },
        },
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      proxy: {
        "/chat": "localhost:8080",
        "^/api": {
          target: "",
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ""),
        },
      },
    },
  }
})
