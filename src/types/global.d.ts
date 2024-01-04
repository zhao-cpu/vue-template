declare namespace Global {
  /** 后端响应 */
  interface BackendResponse<T = any> {
    code: number
    msg: string
    data: T
  }

  /** 分页 */
  interface Pagination {
    /** 当前页码 */
    page?: number
    /** 每页条数 */
    pageSize?: number
  }
}
