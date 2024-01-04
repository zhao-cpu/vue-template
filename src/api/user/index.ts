import instance from '@/utils/request'
// const request = (function () {
//   let hasUrl: string[] = []
//   return (config: any) => {
//     if (hasUrl.includes(config.url)) {
//       // 重复请求拦截
//       return new Promise(() => {})
//     }
//     hasUrl.push(config.url)
//     return instance.get(config)
//       .then((res) => {
//         hasUrl = hasUrl.filter((item) => item !== config.url)
//         return res
//       })
//       .catch((err) => {
//         hasUrl = hasUrl.filter((item) => item !== config.url)
//         throw err
//       })
//   }
// })()

export const usersApi = async () => {
  const result = await instance.get<Global.BackendResponse<Array<ApiUser.UserInfo>>>('/users', {})

  return result.data
}
