import type { ResponseData } from "@/types";
import { request } from "@/utils"

//Requset
type LoginRequest = { account: string; password: string }

/**
 * 用户登录功能，根据action值判断是否成功
 * @param user - {account: string; password: string}
 *
 * @returns null
 */
const fetchLogin = (user: LoginRequest) => request.post<LoginRequest, ResponseData<null>>("/login")(user)
export { fetchLogin, type LoginRequest }
