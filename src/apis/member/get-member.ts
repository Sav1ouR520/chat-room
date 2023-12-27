// fetchGetMember
import type { ResponseData } from "@/types"
import { request } from "@/utils"
type MemberListRequest = { roomId: string }

type MemberList = {
  memberId: string
  memberName: string
  joinTime: Date
  user: { userIcon: string }
}[]

type GetMemberListReponse = ResponseData<MemberList>
/**
 * 请求用户列表数据，返回所有列表和最新的一条聊天记录
 * @param room 提供RoomId值
 * @returns GetMemberListReponse
 */
const fetchGetMember = (room: MemberListRequest) => request.get<MemberListRequest, GetMemberListReponse>("/member")(room)
export { fetchGetMember, type MemberList }
