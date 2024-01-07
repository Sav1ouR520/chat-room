import type { ResponseData } from "@/types"
import { request } from "@/utils"

/**
 * 刷新用户token功能，当用户accessToken过期获取新的accessToken
 * 后端通过 header的 authorization 判断，前端根据action值判断是否成功
 *
 * @returns null
 */
const fetchRefreshToken = () => request.post<never, ResponseData<null>>("/refresh")()

export { fetchRefreshToken }
