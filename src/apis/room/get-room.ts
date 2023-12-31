import type { ResponseData } from "@/types"
import { request } from "@/utils"
type GetRoomRequest = string

type Room = {
  roomId: string
  roomIcon: string
  roomName: string
  owner: string
  createdTime: Date
}

type GetRoomInfoReponse = ResponseData<Room>
/**
 * 根据聊天室ID，获取聊天室的信息
 * @param roomId 聊天室ID
 *
 * @returns GetRoomInfoReponse
 */
const fetchGetRoomInfo = (roomId: string) => request.get<GetRoomRequest, GetRoomInfoReponse>(`/room/${roomId}`)()
export { fetchGetRoomInfo, type Room }
