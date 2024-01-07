import type { VerifyResponse } from "@/types"
import { request } from "@/utils"

// Resquest
type ForgeRequest = { account: string; password: string; code: string }

/**
 * 忘记密码功能，根据verify值判断是否成功
 * @param user - { account: string; password: string; code: string }
 *
 * @returns VerifyResponse
 */
const fetchForge = (user: ForgeRequest) => request.post<ForgeRequest, VerifyResponse>("/forge")(user)
export { fetchForge, type ForgeRequest }
