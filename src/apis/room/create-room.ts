import type { ResponseData } from "@/types"
import { request } from "@/utils"
type CreateRoomRequest = {
  roomIcon: Blob
  roomName: string
}

type CreateRoomReponse = ResponseData<{
  verify: boolean
}>
/**
 * 创建聊天室
 * @param CreateRoomRequest
 * @returns CreateRoomReponse
 */
const fetchCreateRoom = (room: CreateRoomRequest) =>
  request.post<CreateRoomRequest, CreateRoomReponse>(`/room`)(room, {
    headers: {
      "Content-Type": "`multipart/form-data",
    },
  })
export { fetchCreateRoom, type CreateRoomRequest }
