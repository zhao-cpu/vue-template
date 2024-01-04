import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { handleAxiosError } from './helpers'
import qs from 'qs'
/** 白名单 无需加 Authorization */
const white_list = ['/login']

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10 * 1000,
  headers: { 'Content-Type': 'application/json' }
})

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    console.log('在发送请求之前做些什么', config)

    /** 不在白名单里，加上 Authorization */
    if (config?.url && !white_list.includes(config.url)) {
      const token = localStorage.getItem('token') || ''
      config.headers.Authorization = `Bearer ${token}`
    }
    /** 取消请求 */
    // if (!config.repeatRequest) {   }
    setPendingMap(config)

    return config
  },
  (error) => {
    // 对请求错误做些什么
    console.log('对请求错误做些什么', error)
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse<Global.BackendResponse>) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    console.log('对响应数据做点什么', response)

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
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (axios.isCancel(error)) {
      //
      console.log('请求取消', error)
    }
    handleAxiosError(error)
    console.log('对响应错误做点什么', error)
    return Promise.reject(error)
  }
)

const pendingMap = new Map()
/** 拼接请求的key */
function getRequestKey(config: AxiosRequestConfig) {
  return (config.method || '') + config.url + '?' + qs.stringify(config?.data)
}
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
declare module 'axios' {
  export interface AxiosRequestConfig {
    isReturnNativeData?: boolean
    errorMode?: string
    repeatRequest?: boolean
  }
}

export default instance
