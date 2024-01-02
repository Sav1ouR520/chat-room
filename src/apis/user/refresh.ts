import type { VerifyReponse } from "@/types"
import { request } from "@/utils"

/**
 * 刷新用户token功能，当用户accessToken过期获取新的accessToken
 * 通过header的 authorization 判断
 * 刷新成功为true，否则为false
 *
 * @returns VerifyReponse
 */
const fetchRefreshToken = () => request.post<never, VerifyReponse>("/refresh")()

export { fetchRefreshToken }
