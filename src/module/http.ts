import type { RequestQuery } from "@/types"
import axios, { Axios, type AxiosRequestConfig, type CreateAxiosDefaults } from "axios"
import { combUrl } from "../utils/combUrl"

const useAxiosApi = (instance: Axios, subUrl = "") => {
  const get =
    <Q extends RequestQuery, T>(url: string) =>
    (params: Q = Object.create(null), config: AxiosRequestConfig = {}): Promise<T> =>
      instance.get(combUrl(subUrl, url), { params, ...config })

  const del =
    <D extends RequestQuery, T>(url: string) =>
    (params: D = Object.create(null), config: AxiosRequestConfig = {}): Promise<T> =>
      instance.delete(combUrl(subUrl, url), { params, ...config })

  const head =
    <D extends RequestQuery, T>(url: string) =>
    (params: D = Object.create(null), config: AxiosRequestConfig = {}): Promise<T> =>
      instance.head(combUrl(subUrl, url), { params, ...config })

  const post =
    <D extends RequestQuery, T>(url: string) =>
    (data: D = Object.create(null), config: AxiosRequestConfig = {}): Promise<T> =>
      instance.post(combUrl(subUrl, url), data, config)

  const put =
    <D extends RequestQuery, T>(url: string) =>
    (data: D = Object.create(null), config: AxiosRequestConfig = {}): Promise<T> =>
      instance.put(url, data, config)

  const patch =
    <D extends RequestQuery, T>(url: string) =>
    (data: D = Object.create(null), config: AxiosRequestConfig = {}): Promise<T> =>
      instance.patch(combUrl(subUrl, url), data, config)

  // 返回同配置单http.BaseUrl不同的axios实例
  const create = (url: string) => useAxiosApi(instance, url)

  return { get, delete: del, head, post, put, patch, create }
}
const createAxios = (config: CreateAxiosDefaults) => {
  const http = axios.create(config)
  const api = useAxiosApi(http)
  return { http, ...api }
}

export { createAxios }
