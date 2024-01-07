import type { VerifyResponse } from "@/types"
import { request } from "@/utils"

/**
 * 刷新用户token功能，当用户accessToken过期获取新的accessToken
 * 后端通过 header的 authorization 判断，前端根据verify值判断是否成功
 *
 * @returns VerifyResponse
 */
const fetchRefreshToken = () => request.post<never, VerifyResponse>("/refresh")()

export { fetchRefreshToken }
