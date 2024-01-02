import type { ResponseData } from "@/types"
import { request } from "@/utils"
type ChatListRequest = { roomName?: string }

type ChatList = {
  roomId: string
  roomName: string
  roomIcon: string
  lastMessage: {
    memberName: string
    message: string
    sendTime: string
  }
}[]

type GetChatListReponse = ResponseData<ChatList>
/**
 * 请求列表数据，返回所有列表和最新的一条聊天记录
 * @param room 提供RoomId值
 * @returns GetListReponse
 */
const fetchGetList = (room?: ChatListRequest) => request.get<ChatListRequest, GetChatListReponse>("/room")(room)
export { fetchGetList, type ChatList }
