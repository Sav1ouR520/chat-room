import type { ResponseData } from "@/types"
import { request } from "@/utils"

// Resquest
type JoinRoomRequest = { invitation: string }

/**
 * 根据邀请码，加入聊天室，根据action值判断是否成功
 * @param room - { invitation: string }
 *
 * @returns null
 */
const fetchJoinRoom = (room: JoinRoomRequest) => request.post<JoinRoomRequest, ResponseData<null>>(`/room/join`)(room)
export { fetchJoinRoom, type JoinRoomRequest }
