import type { ResponseData } from "@/types"
import { request } from "@/utils"
type JoinRoomRequest = {
  invitation: string
}

type JoinRoomReponse = ResponseData<{
  verify: boolean
}>
/**
 * 根据邀请码，加入聊天室
 * @param GetRoomReques 聊天室ID
 * @returns JoinRoomReponse
 */
const fetchJoinRoom = (room: JoinRoomRequest) => request.post<JoinRoomRequest, JoinRoomReponse>(`/room`)(room)
export { fetchJoinRoom, type JoinRoomRequest }
