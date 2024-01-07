import type { VerifyResponse } from "@/types"
import { request } from "@/utils"
import qs from "qs"

// Request
type DeleteMemberRequest = { members: string[]; roomId: string }

/**
 * 删除聊天室成员，根据verify值判断是否成功
 * @param member - { members: string[]; roomId: string }
 *
 * @returns VerifyResponse
 */
const fetchDeleteMember = (members: DeleteMemberRequest) => request.delete<DeleteMemberRequest, VerifyResponse>("/member")(members, { paramsSerializer: params => qs.stringify(params, { indices: false }) })
export { fetchDeleteMember }
