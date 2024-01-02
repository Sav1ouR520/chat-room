import { defineMock } from "vite-plugin-mock-dev-server"
import { ResponseData } from "../shared/utils"
export default defineMock({
  url: "/api/sendEmail",
  enabled: true,
  method: "GET",
  delay: 1000,
  body: (): ResponseData => ({ data: { nextTime: Date.now() + 60 * 1000 }, message: "验证码发送成功", timestamp: Date.now() }),
})
