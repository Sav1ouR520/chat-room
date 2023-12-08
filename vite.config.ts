// vite.config.ts
import { fileURLToPath, URL } from "node:url"
import { defineConfig, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "node:path"

// i18n、mock
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

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), "")
  return {
    base: env.VITE_APP_BASE_URL || "/",
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
        dts: "src/components.d.ts",
        deep: true,
        dirs: ["src/components"],
        resolvers: [IconsResolver()],
      }),

      // https://github.com/unplugin/unplugin-auto-import
      AutoImport({
        imports: ["vue", "vue-router", "pinia", "vue-i18n"],
        resolvers: [VueHooksPlusResolver()],
        dts: "src/auto-imports.d.ts",
      }),

      // https://github.com/unplugin/unplugin-icons
      Icons({
        autoInstall: true,
      }),

      command === "build" && Inspect(),

      // https://github.com/intlify/bundle-tools
      VueI18nPlugin({
        runtimeOnly: true,
        compositionOnly: true,
        fullInstall: true,
        include: [path.resolve(__dirname, "locales/**")],
      }),

      UnoCSS({
        configFile: "uno.config.ts",
      }),

      // https://github.com/pengzhanbo/vite-plugin-mock-dev-server
      MockDevServerPlugin(),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      proxy: {
        "^/api": {
          target: "",
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ""),
        },
      },
    },
  }
})
