import instance from '@/utils/request'

export const usersApi = async () => {
  const result = await instance.get<Global.BackendResponse<Array<ApiUser.UserInfo>>>('/users', {})
  return result.data
}
