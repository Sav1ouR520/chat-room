import type { VerifyReponse } from "@/types"
import { request } from "@/utils"
type DeleteMemberRequest = { members: string[]; roomId: string }
import qs from "qs"

/**
 * 删除聊天室成员，返回verify，判断是否执行删除成功
 * @param member RoomId值 和 memberId数组
 *
 * @returns VerifyReponse
 */
const fetchDeleteMember = (members: DeleteMemberRequest) => request.delete<DeleteMemberRequest, VerifyReponse>("/member")(members, { paramsSerializer: params => qs.stringify(params, { indices: false }) })
export { fetchDeleteMember }
