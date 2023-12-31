import type { ResponseData } from "@/types"
import { request } from "@/utils"
type GetMessageRequest = { roomId: string }

type ChatMessage = {
  messageId: string
  memberId: string
  memberName: string
  message: string
  sendTime: string
  user: {
    userIcon: string
  }
}[]

type GetMessageListReponse = ResponseData<ChatMessage>
/**
 * 请求列表数据，返回所有列表和最新的一条聊天记录
 * @param roomId 聊天室的ID
 *
 * @returns GetMessageListReponse
 */
const fetchGetMessage = (room: GetMessageRequest) => request.get<GetMessageRequest, GetMessageListReponse>(`/message`)(room)

export { fetchGetMessage, type ChatMessage }
