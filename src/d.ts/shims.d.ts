declare interface ImportMetaEnv {
  readonly MODE: "development" | "production"
  readonly DEV: boolean
  readonly PROD: boolean
  readonly SSR: boolean
  readonly BASE_URL: string

  readonly VITE_API_URL: string
  readonly VITE_BASE_URL: string
  readonly VITE_TIMEOUT: string
}
