import type { ResponseData } from "@/types"
import { request } from "@/utils"
type MemberListRequest = { roomId: string }

type Member = { memberId: string; memberName: string; joinTime: string; user: { userIcon: string }; role: "user" | "admin" }

type GetMemberListReponse = ResponseData<Member[]>
/**
 * 请求用户列表数据，返回所有列表和最新的一条聊天记录
 * @param room RoomId值
 *
 * @returns GetMemberListReponse
 */
const fetchGetMember = (room: MemberListRequest) => request.get<MemberListRequest, GetMemberListReponse>("/member")(room)
export { fetchGetMember, type Member }
