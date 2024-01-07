import type { ResponseData } from "@/types"
import { request } from "@/utils"

//Requset
type ModifyUserRequest = { userName?: string; password?: string; newPassword?: string; userIcon?: Blob }

/**
 * 用户修改信息功能，根据action值判断是否成功
 * @param user - { userName?: string; password?: string; newPassword?: string; userIcon?: Blob }
 *
 * @returns null
 */
const fetchModifyUser = (user: ModifyUserRequest) =>
  request.put<ModifyUserRequest, ResponseData<null>>("/user")(user, {
    headers: {
      "Content-Type": "`multipart/form-data",
    },
  })
export { fetchModifyUser, type ModifyUserRequest }
