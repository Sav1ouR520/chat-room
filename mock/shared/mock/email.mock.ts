import { defineMock } from "vite-plugin-mock-dev-server"
import { API_URL, createApiResData } from "@shared"

export default defineMock({
  url: API_URL + "/sendEmail",
  body: () => createApiResData({ message: "验证码发送成功", data: { nextTime: Date.now() + 60 * 1000 } }),
})
