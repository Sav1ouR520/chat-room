import type { VerifyResponse } from "@/types"
import { request } from "@/utils"

// Resquest
type JoinRoomRequest = { invitation: string }

/**
 * 根据邀请码，加入聊天室，根据verify值判断是否成功
 * @param room - { invitation: string }
 *
 * @returns VerifyResponse
 */
const fetchJoinRoom = (room: JoinRoomRequest) => request.get<JoinRoomRequest, VerifyResponse>(`/room/join`)(room)
export { fetchJoinRoom, type JoinRoomRequest }
