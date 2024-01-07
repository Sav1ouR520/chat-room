import { defineMock } from "vite-plugin-mock-dev-server"
import { API_URL, ResponseData } from "../utils"

export default defineMock({
  url: API_URL + "/sendEmail",
  body: (): ResponseData => ({ action: true, data: { nextTime: Date.now() + 60 * 1000 }, message: "验证码发送成功", timestamp: Date.now() }),
})
