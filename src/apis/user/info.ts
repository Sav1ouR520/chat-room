import type { ResponseData } from "@/types"
import { request } from "@/utils"

// Response
type UserInfo = { userId: string; userIcon: string; userName: string; account: string; registerTime: Date }
type GetUserResponse = ResponseData<UserInfo>

/**
 * 请求用户数据，返回用户头像和姓名
 * @returns GetListResponse
 */
const fetchUserInfo = () => request.get<never, GetUserResponse>("/user")()
export { fetchUserInfo, type UserInfo }
