import type { ResponseData } from "@/types"
import { request } from "@/utils"
type GetMessageRequest = string

type ChatMessage = {
  messageId: string
  userId: string
  userName: string
  userIcon: string
  message: string
  time: Date
}[]

type GetMessageListReponse = ResponseData<ChatMessage>
/**
 * 请求列表数据，返回所有列表和最新的一条聊天记录
 * @param roomId 聊天室的ID
 * @returns GetMessageListReponse
 */
const fetchGetMessage = (roomId: string) => request.get<GetMessageRequest, GetMessageListReponse>(`/message/${roomId}`)

export { fetchGetMessage, type ChatMessage }
