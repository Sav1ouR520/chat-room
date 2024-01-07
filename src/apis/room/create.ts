import type { VerifyResponse } from "@/types"
import { request } from "@/utils"

// Request
type CreateRoomRequest = { roomIcon: Blob; roomName: string }

/**
 * 创建聊天室，根据verify值判断是否成功
 * @param room - { roomIcon: Blob; roomName: string }
 *
 * @returns VerifyResponse
 */
const fetchCreateRoom = (room: CreateRoomRequest) =>
  request.post<CreateRoomRequest, VerifyResponse>(`/room`)(room, {
    headers: {
      "Content-Type": "`multipart/form-data",
    },
  })
export { fetchCreateRoom, type CreateRoomRequest }
