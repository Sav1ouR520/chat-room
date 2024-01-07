import type { ResponseData } from "@/types"
import { request } from "@/utils"

// Resquest
type ChatListRequest = { roomName?: string }

// Response
type ChatListItem = {
  message?: {
    memberName: string
    messageId: string
    memberId: string
    message: string
    sendTime: string
  }
  roomId: string
  roomName: string
  roomIcon: string
  owner: string
  createdTime: string
}

type GetChatListResponse = ResponseData<ChatListItem[]>
/**
 * 请求列表数据，返回所有列表和最新的一条聊天记录
 * @param room - { roomName?: string }
 *
 * @returns GetChatListResponse
 */
const fetchGetList = (room?: ChatListRequest) => request.get<ChatListRequest, GetChatListResponse>("/room/list")(room)
export { fetchGetList, type ChatListItem }
