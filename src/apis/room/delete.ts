import type { ResponseData } from "@/types"
import { request } from "@/utils"

// Request
type DeleteRoomRequest = string

/**
 * 通过聊天室id删除聊天室，根据action值判断是否成功
 * @param roomId - string
 *
 * @returns null
 */
const fetchDeleteRoom = (roomId: DeleteRoomRequest) => request.delete<DeleteRoomRequest, ResponseData<null>>(`/room/${roomId}`)()
export { fetchDeleteRoom }
