import type { VerifyReponse } from "@/types"
import { request } from "@/utils"
type CreateRoomRequest = {
  roomIcon: Blob
  roomName: string
}

/**
 * 创建聊天室
 * @param room 参数为图片和房间名
 *
 * @returns VerifyReponse
 */
const fetchCreateRoom = (room: CreateRoomRequest) =>
  request.post<CreateRoomRequest, VerifyReponse>(`/room`)(room, {
    headers: {
      "Content-Type": "`multipart/form-data",
    },
  })
export { fetchCreateRoom, type CreateRoomRequest }
