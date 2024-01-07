import type { ResponseData } from "@/types"
import { request } from "@/utils"

// Resquest
type ModifyRoomRequest = { roomId: string; roomName?: String; roomIcon?: Blob; owner?: string }

/**
 * 聊天室修改信息功能，根据action值判断是否成功
 * @param room -{ roomId: string; roomName?: String; roomIcon?: Blob; owner?: string }
 *
 * @returns null
 */
const fetchModifyRoom = (room: ModifyRoomRequest) =>
  request.put<ModifyRoomRequest, ResponseData<null>>("/room")(room, {
    headers: { "Content-Type": "`multipart/form-data" },
  })
export { fetchModifyRoom, type ModifyRoomRequest }
