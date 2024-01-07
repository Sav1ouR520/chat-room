import type { ResponseData } from "@/types"
import { request } from "@/utils"

// Resquest
type GetRoomRequest = string

// Response
type Room = { roomId: string; roomIcon: string; roomName: string; createdTime: string; owner: { memberId: string; memberName: string; userId: string; joinTime: string; role: "user" | "admin" } }
type GetRoomInfoResponse = ResponseData<Room>

/**
 * 根据聊天室ID，获取聊天室的信息
 * @param roomId - string
 *
 * @returns GetRoomInfoResponse
 */
const fetchGetRoomInfo = (roomId: GetRoomRequest) => request.get<GetRoomRequest, GetRoomInfoResponse>(`/room/${roomId}`)()
export { fetchGetRoomInfo, type Room }
