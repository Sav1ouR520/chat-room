import type { ResponseData } from "@/types"
import { request } from "@/utils"
type LoginRequest = {
  account: string
  password: string
}

type LoginReponse = ResponseData<{
  verify: number
}>

/**
 * 用户登录功能，根据verify值判断是否登录成功
 * 登录成功为true，失败为false，原因查看message
 * @param account 账号
 * @param password 密码
 *
 * @returns LoginReponse
 */
const fetchLogin = (user: LoginRequest) => request.post<LoginRequest, LoginReponse>("/login")(user)
export { fetchLogin, type LoginRequest }
