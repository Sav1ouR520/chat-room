import type { VerifyReponse } from "@/types"
import { request } from "@/utils"
type ForgeRequest = {
  account: string
  password: string
  code: string
}

/**
 * 忘记密码功能，根据verify值判断是否注册成功
 * 修改成功成功为true，失败为false，原因查看message
 * @param user
 *
 * @returns VerifyReponse
 */
const fetchForge = (user: ForgeRequest) => request.post<ForgeRequest, VerifyReponse>("/forge")(user)
export { fetchForge, type ForgeRequest }
