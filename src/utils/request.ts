import type { AxiosError, AxiosResponse } from "axios"
import { createAxios } from "@/module/http"
import { TokenStore } from "@/stores"
import { fetchRefreshToken } from "@/apis"

const request = createAxios({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: Number(import.meta.env.VITE_TIMEOUT),
  withCredentials: true,
})

// 请求拦截器
request.http.interceptors.request.use(
  config => {
    if (config.headers) {
      const tokenStore = TokenStore()
      if (tokenStore.accessToken) config.headers.Authorization = "Bearer " + tokenStore.accessToken
      if (tokenStore.refreshToken && config.url === "/refresh") config.headers.Authorization = "Bearer " + tokenStore.refreshToken
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
request.http.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      const tokenStore = TokenStore()
      const [accessToken, refreshToken] = [response.headers["access-token"], response.headers["refresh-token"]]
      if (accessToken) tokenStore.accessToken = accessToken
      if (refreshToken) tokenStore.refreshToken = refreshToken
      return Promise.resolve(response.data)
    }
    return Promise.reject(response)
  },
  (error: AxiosError) => {
    const tokenStore = TokenStore()
    if (error.config?.url === "/refresh") {
      tokenStore.$reset()
      const router = useRouter()
      router.push({ name: "login" })
    } else if (error.response?.status === 401 && !tokenStore.isRefreshing) {
      tokenStore.isRefreshing = true
      fetchRefreshToken().finally(() => (tokenStore.isRefreshing = false))
    }
    Promise.reject(error)
  },
)

export { request }
