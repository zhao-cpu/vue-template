export function handleAxiosError(axiosError: any) {
  // 默认值
  const error = {
    code: 'ERR_BAD_RESPONSE',
    status: 500,
    message: '请求错误'
  }

  /**  2xx 范围的错误处理 */
  if (axiosError?.data) {
    const { status } = axiosError
    const { code, msg: message } = axiosError.data
    Object.assign(error, { code, status, message })
  }

  /** 超出 2xx 范围的错误处理 */
  if (axiosError?.response) {
    const { code, message, status } = axiosError.response.data
    Object.assign(error, { code, status, message })
  }

  console.log('统一处理 error ： ', error)
}
