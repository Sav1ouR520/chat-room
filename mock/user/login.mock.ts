import { defineMock } from "vite-plugin-mock-dev-server"
import { ResponseData } from "../utils"
import { user } from "./user.data"
export default defineMock({
  url: "/api/login",
  enabled: true,
  method: "POST",
  delay: 1000,
  body: ({ body }): ResponseData => {
    const [getUser] = user
    const item = getUser().filter(user => user.account == body.account && user.password == body.password)
    if (item.length !== 0) {
      return { message: "登录成功", data: { verify: true }, timestamp: Date.now() }
    } else {
      return { message: "账号不存在/密码错误", data: { verify: false }, timestamp: Date.now() }
    }
  },
})
