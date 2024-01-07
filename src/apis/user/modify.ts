import type { VerifyResponse } from "@/types"
import { request } from "@/utils"

//Requset
type ModifyUserRequest = { userName?: string; password?: string; newPassword?: string; userIcon?: Blob }

/**
 * 用户修改信息功能，根据verify值判断是否成功
 * @param user - { userName?: string; password?: string; newPassword?: string; userIcon?: Blob }
 *
 * @returns VerifyResponse
 */
const fetchModifyUser = (user: ModifyUserRequest) =>
  request.put<ModifyUserRequest, VerifyResponse>("/user")(user, {
    headers: {
      "Content-Type": "`multipart/form-data",
    },
  })
export { fetchModifyUser, type ModifyUserRequest }
