import type { VerifyReponse } from "@/types"
import { request } from "@/utils"
type LoginRequest = {
  account: string
  password: string
}

/**
 * 用户登录功能，根据verify值判断是否登录成功
 * 登录成功为true，失败为false，原因查看message
 * @param LoginRequest 账号 密码
 *
 * @returns VerifyReponse
 */
const fetchLogin = (user: LoginRequest) => request.post<LoginRequest, VerifyReponse>("/login")(user)
export { fetchLogin, type LoginRequest }
