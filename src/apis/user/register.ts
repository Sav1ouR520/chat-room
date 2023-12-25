import type { ResponseData } from "@/types"
import { request } from "@/utils"
type RegisterRequest = {
  account: string
  password: string
  code: string
}

type RegisterReponse = ResponseData<{
  verify: boolean
}>
/**
 * 用户注册功能，根据verify值判断是否注册成功
 * 注册成功为true，失败为false，原因查看message
 * @param user
 * @returns RegisterReponse
 */
const fetchRegister = (user: RegisterRequest) => request.post<RegisterRequest, RegisterReponse>("/register")(user)
export { fetchRegister, type RegisterRequest }
