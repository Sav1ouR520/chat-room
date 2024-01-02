import type { ResponseData } from "@/types"
import { request } from "@/utils"

type UserInfo = {
  userIcon: string
  userName: string
  account: string
  registerTime: Date
}

type GetUserReponse = ResponseData<UserInfo>
/**
 * 请求用户数据，返回用户头像和姓名
 * @returns GetListReponse
 */
const fetchUserInfo = () => request.get<never, GetUserReponse>("/user")()
export { fetchUserInfo, type UserInfo }
