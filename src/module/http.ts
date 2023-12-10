import type { RequestQuery } from "@/types"
import axios, { Axios, type AxiosRequestConfig, type CreateAxiosDefaults } from "axios"
import { combUrl } from "../utils/combUrl"

const useAxiosApi = (instance: Axios, subUrl = "") => {
  const get = <Q extends RequestQuery, T>(url: string) => {
    url = combUrl(subUrl, url)
    return (params: Q = Object.create(null), config: AxiosRequestConfig = {}): Promise<T> => {
      return instance.get(url, { params, ...config })
    }
  }

  const del = <D extends RequestQuery, T>(url: string) => {
    url = combUrl(subUrl, url)
    return (params: D = Object.create(null), config: AxiosRequestConfig = {}): Promise<T> => {
      return instance.delete(url, { params, ...config })
    }
  }

  const head = <D extends RequestQuery, T>(url: string) => {
    url = combUrl(subUrl, url)
    return (params: D = Object.create(null), config: AxiosRequestConfig = {}): Promise<T> => {
      return instance.head(url, { params, ...config })
    }
  }

  const post = <D extends Record<string, any>, T>(url: string) => {
    url = combUrl(subUrl, url)
    return (data: D = Object.create(null), config: AxiosRequestConfig = {}): Promise<T> => {
      return instance.post(url, data, config)
    }
  }

  const put = <D extends Record<string, any>, T>(url: string) => {
    url = combUrl(subUrl, url)
    return (data: D = Object.create(null), config: AxiosRequestConfig = {}): Promise<T> => {
      return instance.put(url, data, config)
    }
  }

  const patch = <D extends Record<string, any>, T>(url: string) => {
    url = combUrl(subUrl, url)
    return (data: D = Object.create(null), config: AxiosRequestConfig = {}): Promise<T> => {
      return instance.patch(url, data, config)
    }
  }

  // 返回同配置单http.BaseUrl不同的axios实例
  const create = (url: string) => {
    return useAxiosApi(instance, url)
  }

  return { get, delete: del, head, post, put, patch, create }
}
const createAxios = (config: CreateAxiosDefaults) => {
  const http = axios.create(config)
  const api = useAxiosApi(http)
  return { http, ...api }
}

export { createAxios }
