import mitt from "mitt"
import type { App } from "vue"
const Mit = mitt()
declare module "vue" {
  export interface ComponentCustomProperties {
    $Bus: typeof Mit
  }
}

const setupBus = (app: App) => (app.config.globalProperties.$Bus = Mit)

export { setupBus }
