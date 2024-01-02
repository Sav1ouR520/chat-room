import type { VerifyReponse } from "@/types"
import { request } from "@/utils"
type ModifyUserRequest = {
  userName?: string
  password?: string
  newPassword?: string
  userIcon?: Blob
}

/**
 * 用户修改信息功能，根据verify值判断是否注册成功
 * 修改成功为true，失败为false，原因查看message
 * @param user
 *
 * @returns VerifyReponse
 */
const fetchModifyUser = (user: ModifyUserRequest) =>
  request.put<ModifyUserRequest, VerifyReponse>("/user")(user, {
    headers: {
      "Content-Type": "`multipart/form-data",
    },
  })
export { fetchModifyUser, type ModifyUserRequest }
