import type { ResponseData } from "@/types"
import { request } from "@/utils"
import type { MemberWithRoomId } from "./list"

// Request
type MemberInfoRequest = { roomId: string }

// Response
type GetMemberInfoResponse = ResponseData<MemberWithRoomId>

/**
 * 获取自己的用户信息
 * @param roomId - { roomId: string }
 *
 * @returns GetMemberInfoResponse
 */
const fetchGetOwnMemberInfo = (roomId: MemberInfoRequest) => request.get<MemberInfoRequest, GetMemberInfoResponse>(`/member`)(roomId)
export { fetchGetOwnMemberInfo }
