import type { ResponseData } from "@/types"
import { request } from "@/utils"

type ChatList = {
  roomId: string
  roomName: string
  roomIcon: string
  userName: string
  message: string
  time: Date
}[]

type GetListReponse = ResponseData<ChatList>
/**
 * 请求列表数据，返回所有列表和最新的一条聊天记录
 * @returns GetListReponse
 */
const fetchGetList = () => request.get<never, GetListReponse>("/list")()
export { fetchGetList, type ChatList }
