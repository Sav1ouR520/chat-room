import type { ResponseData } from "@/types"
import { request } from "@/utils"
type LoginRequest = {
  account: string
  password: string
}

type LoginReponse = ResponseData<{
  verify: boolean
}>

/**
 * 用户登录功能，返回的data含有action
 * 登录成功为true，登录失败为false
 * @param account 账号
 * @param password 密码
 *
 * @returns LoginReponse - [action:boolean]
 */
const fetchLogin = (user: LoginRequest) => request.post<LoginRequest, LoginReponse>("/login")(user)
// const fetchLogin = request.post<LoginRequest, LoginReponse>("/login")
export { fetchLogin, type LoginRequest, type LoginReponse }
