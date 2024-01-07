import type { ResponseData } from "@/types";
import { request } from "@/utils"

//Requset
type RegisterRequest = { account: string; password: string; code: string }

/**
 * 用户注册功能，根据action值判断是否成功
 * @param user - { account: string; password: string; code: string }
 *
 * @returns null
 */
const fetchRegister = (user: RegisterRequest) => request.post<RegisterRequest, ResponseData<null>>("/register")(user)
export { fetchRegister, type RegisterRequest }
