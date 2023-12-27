import type { ResponseData } from "@/types"
import { request } from "@/utils"
type ModifyRequest = {
  userName?: string
  password?: string
  newPassword?: string
  userIcon?: Blob
}

type ModifyReponse = ResponseData<{
  verify: boolean
}>
/**
 * 用户修改信息功能，根据verify值判断是否注册成功
 * 修改成功为true，失败为false，原因查看message
 * @param user
 * @returns ModifyReponse
 */
const fetchModifyUser = (user: ModifyRequest) =>
  request.put<ModifyRequest, ModifyReponse>("/user")(user, {
    headers: {
      "Content-Type": "`multipart/form-data",
    },
  })
export { fetchModifyUser, type ModifyRequest }
