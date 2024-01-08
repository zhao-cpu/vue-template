import 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    /** 重复请求 */
    repeatRequest?: boolean
  }
}
