import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'

import { handleAxiosError } from './helpers'

/** 白名单 无需加 Authorization */
const white_list = ['/login']

/** 存放请求 */
const pendingMap = new Map()

/** 拼接请求的key */
function getRequestKey(config: AxiosRequestConfig) {
  return (config.method || '') + config.url + '?' + qs.stringify(config?.data)
}

/** 处理 */
function setPendingMap(config: AxiosRequestConfig) {
  const key = getRequestKey(config)
  if (pendingMap.has(key)) {
    pendingMap.get(key).abort()
    pendingMap.delete(key)
  }

  const controller = new AbortController()
  pendingMap.set(key, controller)
  config.signal = controller.signal
}

/** axios 实例 */
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 10 * 1000,
  headers: { 'Content-Type': 'application/json' }
})

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么

    /** 不在白名单里，加上 Authorization */
    if (config?.url && !white_list.includes(config.url)) {
      const token = localStorage.getItem('token') || ''
      config.headers.Authorization = `Bearer ${token}`
    }

    /** 取消重复请求 */
    if (!config.repeatRequest) {
      setPendingMap(config)
    }

    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse<Global.BackendResponse>) => {
    // 2xx 范围内的状态码都会触发该函数。

    const key = getRequestKey(response.config)
    if (pendingMap.has(key)) {
      pendingMap.delete(key)
    }

    if (response.data.code === 0) {
      /** 成功 */
      return response
    } else {
      /** 失败 */
      handleAxiosError(response)

      return Promise.reject(response)
    }
  },
  (error) => {
    /** 超出 2xx 范围的状态码都会触发该函数。 */

    /** 取消请求 */
    if (axios.isCancel(error)) {
      console.log('请求取消', error)
    }

    handleAxiosError(error)

    return new Promise(() => {})
  }
)

export default instance
