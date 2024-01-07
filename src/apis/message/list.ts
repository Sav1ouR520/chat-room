import type { ResponseData } from "@/types"
import { request } from "@/utils"
type GetMessageRequest = { roomId: string }

type ChatMessageItem = {
  messageId: string
  member: {
    memberId: string
    memberName: string
  }
  message: string
  sendTime: string
  user: {
    userIcon: string
  }
}

type GetMessageListResponse = ResponseData<ChatMessageItem[]>
/**
 * 请求列表数据，返回所有列表和最新的一条聊天记录
 * @param roomId 聊天室的ID
 *
 * @returns GetMessageListResponse
 */
const fetchGetMessage = (room: GetMessageRequest) => request.get<GetMessageRequest, GetMessageListResponse>(`/message/list`)(room)

export { fetchGetMessage, type ChatMessageItem }
