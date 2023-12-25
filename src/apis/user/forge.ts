import type { ResponseData } from "@/types"
import { request } from "@/utils"
type ForgeRequest = {
  account: string
  password: string
  code: string
}

type ForgeReponse = ResponseData<{
  verify: boolean
}>

/**
 * 忘记密码功能，根据verify值判断是否注册成功
 * 修改成功成功为true，失败为false，原因查看message
 * @param user
 * @returns ForgeReponse
 */
const fetchForge = (user: ForgeRequest) => request.post<ForgeRequest, ForgeReponse>("/forge")(user)
export { fetchForge, type ForgeRequest }
