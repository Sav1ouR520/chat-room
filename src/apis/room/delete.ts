import type { VerifyResponse } from "@/types"
import { request } from "@/utils"

// Request
type DeleteRoomRequest = string

/**
 * 通过聊天室id删除聊天室，根据verify值判断是否成功
 * @param roomId - string
 *
 * @returns VerifyResponse
 */
const fetchDeleteRoom = (roomId: DeleteRoomRequest) => request.delete<DeleteRoomRequest, VerifyResponse>(`/room/${roomId}`)()
export { fetchDeleteRoom }
