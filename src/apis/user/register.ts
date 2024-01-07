import type { VerifyResponse } from "@/types"
import { request } from "@/utils"

//Requset
type RegisterRequest = { account: string; password: string; code: string }

/**
 * 用户注册功能，根据verify值判断是否成功
 * @param user - { account: string; password: string; code: string }
 *
 * @returns VerifyResponse
 */
const fetchRegister = (user: RegisterRequest) => request.post<RegisterRequest, VerifyResponse>("/register")(user)
export { fetchRegister, type RegisterRequest }
