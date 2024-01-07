import type { ResponseData } from "@/types"
import { request } from "@/utils"
import qs from "qs"

// Request
type DeleteMemberRequest = { members: string[]; roomId: string }

/**
 * 删除聊天室成员，根据action值判断是否成功
 * @param member - { members: string[]; roomId: string }
 *
 * @returns null
 */
const fetchDeleteMember = (members: DeleteMemberRequest) => request.delete<DeleteMemberRequest, ResponseData<null>>("/member")(members, { paramsSerializer: params => qs.stringify(params, { indices: false }) })
export { fetchDeleteMember }
