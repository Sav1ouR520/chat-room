/// <reference types="vite/client" />
declare interface ImportMetaEnv {
  readonly MODE: "development" | "production"
  readonly DEV: boolean
  readonly PROD: boolean
  readonly SSR: boolean
  readonly BASE_URL: string

  readonly VITE_API_URL: string
  readonly VITE_BASE_URL: string
  readonly VITE_TIMEOUT: string
  readonly VITE_MOCK_SECERT_KEY: string
}

declare module "qs"

interface ImportMeta {
  readonly env: ImportMetaEnv
}
