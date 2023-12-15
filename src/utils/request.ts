import type { Token } from "@/types"
import { AxiosError, type AxiosResponse } from "axios"
import { useLocalStorageState } from "vue-hooks-plus"
import { createAxios } from "@/module/http"

const request = createAxios({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: Number(import.meta.env.VITE_TIMEOUT),
  withCredentials: true,
})

// 请求拦截器
request.http.interceptors.request.use(
  config => {
    if (config.headers) {
      const [token] = useLocalStorageState<Token>("token")
      if (token.value) {
        const { accessToken, refreshToken } = token.value
        config.headers.Authorization = "Bearer " + accessToken
        if (config.url === "/refresh") {
          config.headers.Authorization = "Bearer " + refreshToken
        }
      }
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
    return response.status === 200 ? Promise.resolve(response.data) : Promise.reject(response)
  },
  (error: AxiosError) => {
    if (error.response!.status) Promise.reject(error)
  },
)

export { request }
