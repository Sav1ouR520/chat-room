import type { VerifyResponse } from "@/types"
import { request } from "@/utils"

// Resquest
type ModifyRoomRequest = { roomId: string; roomName?: String; roomIcon?: Blob; owner?: string }

/**
 * 聊天室修改信息功能，根据verify值判断是否成功
 * @param room -{ roomId: string; roomName?: String; roomIcon?: Blob; owner?: string }
 *
 * @returns VerifyResponse
 */
const fetchModifyRoom = (room: ModifyRoomRequest) =>
  request.put<ModifyRoomRequest, VerifyResponse>("/room")(room, {
    headers: {
      "Content-Type": "`multipart/form-data",
    },
  })
export { fetchModifyRoom, type ModifyRoomRequest }
