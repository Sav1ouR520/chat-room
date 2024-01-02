import type { VerifyReponse } from "@/types"
import { request } from "@/utils"
type ModifyRoomRequest = {
  roomId: string
  roomName?: String
  roomIcon?: Blob
  owner?: string
}

/**
 * 聊天室修改信息功能，根据verify值判断是否注册成功
 * 修改成功为true，失败为false，原因查看message
 * @param room
 *
 * @returns VerifyReponse
 */
const fetchModifyRoom = (room: ModifyRoomRequest) =>
  request.put<ModifyRoomRequest, VerifyReponse>("/room")(room, {
    headers: {
      "Content-Type": "`multipart/form-data",
    },
  })
export { fetchModifyRoom, type ModifyRoomRequest }
