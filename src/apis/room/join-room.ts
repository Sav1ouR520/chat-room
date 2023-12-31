import type { VerifyReponse } from "@/types"
import { request } from "@/utils"
type JoinRoomRequest = {
  invitation: string
}

/**
 * 根据邀请码，加入聊天室
 * @param room 聊天室ID
 *
 * @returns JoinRoomReponse
 */
const fetchJoinRoom = (room: JoinRoomRequest) => request.post<JoinRoomRequest, VerifyReponse>(`/room`)(room)
export { fetchJoinRoom, type JoinRoomRequest }
