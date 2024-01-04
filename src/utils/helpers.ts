export function handleAxiosError(axiosError: any) {
  // 处理 error
  const error = {
    code: 'UNKNOWN_ERROR_CODE',
    status: 500,
    message: '请求错误'
  }

  /**  2xx 范围的错误处理 */
  if (axiosError?.data) {
    const { code, status, msg: message } = axiosError.data
    Object.assign(error, { code, status, message })
  }
  /** 超出 2xx 范围的错误处理 */
  if (axiosError?.response) {
    const { status } = axiosError.response
    const { code, message } = axiosError.response.data
    Object.assign(error, { code, status, message })
  }

  console.log('统一 error ', error)
}
