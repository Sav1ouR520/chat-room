import type { VerifyResponse } from "@/types"
import { request } from "@/utils"

//Requset
type LoginRequest = {account: string; password: string}

/**
 * 用户登录功能，根据verify值判断是否成功
 * @param user - {account: string; password: string}
 *
 * @returns VerifyResponse
 */
const fetchLogin = (user: LoginRequest) => request.post<LoginRequest, VerifyResponse>("/login")(user)
export { fetchLogin, type LoginRequest }
