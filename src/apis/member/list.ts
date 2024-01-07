import type { ResponseData } from "@/types"
import { request } from "@/utils"

// Request
type MemberListRequest = { roomId: string }

// Response
type Member = { memberId: string; memberName: string; joinTime: string; role: "user" | "admin" }
type MemberWithRoomId = Member & { roomId: string }
type MemberWithUser = Member & { user: { userIcon: string; userId: string } }
type GetMemberListResponse = ResponseData<MemberWithUser[]>

/**
 * 请求用户列表数据，返回所有列表和最新的一条聊天记录
 * @param room - { roomId: string }
 *
 * @returns GetMemberListResponse
 */
const fetchGetMemberList = (room: MemberListRequest) => request.get<MemberListRequest, GetMemberListResponse>("/member/list")(room)
export { fetchGetMemberList, type MemberWithUser, type Member, type MemberWithRoomId }
