import type { ResponseData } from "@/types"
import { request } from "@/utils"

// Request
type GetMessageRequest = { roomId: string }

// Response
type ChatMessageItem = { messageId: string; memberId: string; message: string; sendTime: string }
type GetMessageListResponse = ResponseData<ChatMessageItem[]>

/**
 * 请求列表数据，返回所有列表和最新的一条聊天记录
 * @param roomId 聊天室的ID
 *
 * @returns GetMessageListResponse
 */
const fetchGetMessage = (room: GetMessageRequest) => request.get<GetMessageRequest, GetMessageListResponse>(`/message/list`)(room)

export { fetchGetMessage, type ChatMessageItem }
