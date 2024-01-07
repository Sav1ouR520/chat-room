import type { ResponseData } from "@/types"
import { request } from "@/utils"
import type { MemberWithUser } from "./list"

// Request
type MemberInfoRequest = { roomId: string; memberId: string }

// Response
type GetMemberInfoResponse = ResponseData<MemberWithUser>

/**
 * 请求某个聊天室用户的信息
 * @param member - { roomId: string; memberId: string }
 *
 * @returns GetMemberInfoResponse
 */
const fetchGetRoomMemberInfo = (member: MemberInfoRequest) => request.get<MemberInfoRequest, GetMemberInfoResponse>(`/member/info/`)(member)
export { fetchGetRoomMemberInfo }
