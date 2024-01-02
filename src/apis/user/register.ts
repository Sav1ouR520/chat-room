import type { VerifyReponse } from "@/types"
import { request } from "@/utils"
type RegisterRequest = {
  account: string
  password: string
  code: string
}

/**
 * 用户注册功能，根据verify值判断是否注册成功
 * 注册成功为true，失败为false，原因查看message
 * @param user 账号 密码 邮箱验证码
 *
 * @returns VerifyReponse
 */
const fetchRegister = (user: RegisterRequest) => request.post<RegisterRequest, VerifyReponse>("/register")(user)
export { fetchRegister, type RegisterRequest }
