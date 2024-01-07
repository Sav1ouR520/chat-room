import type { ResponseData } from "@/types"
import { request } from "@/utils"

// Response
type SendEmailResponse = ResponseData<{
  nextTime: number
}>

/**
 * 发送邮箱验证码功能 无需添加参数
 * @returns ResponseData
 */
const fetchSendEmail = () => request.get<never, SendEmailResponse>("sendEmail")()
export { fetchSendEmail }
