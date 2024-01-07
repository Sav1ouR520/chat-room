import type { ResponseData } from "@/types";
import { request } from "@/utils"

// Resquest
type ForgeRequest = { account: string; password: string; code: string }

/**
 * 忘记密码功能，根据action值判断是否成功
 * @param user - { account: string; password: string; code: string }
 *
 * @returns null
 */
const fetchForge = (user: ForgeRequest) => request.post<ForgeRequest, ResponseData<null>>("/forge")(user)
export { fetchForge, type ForgeRequest }
