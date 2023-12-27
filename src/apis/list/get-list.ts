import type { ResponseData } from "@/types"
import { request } from "@/utils"
type ChatListRequest = { roomName?: string }

type ChatList = {
  roomId: string
  roomName: string
  roomIcon: string
  userName: string
  message: string
  sendTime: string
}[]

type GetListReponse = ResponseData<ChatList>
/**
 * 请求列表数据，返回所有列表和最新的一条聊天记录
 * @returns GetListReponse
 */
const fetchGetList = (room?: ChatListRequest) => request.get<ChatListRequest, GetListReponse>("/list")(room)
export { fetchGetList, type ChatList }
