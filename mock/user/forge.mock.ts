import { defineMock } from "vite-plugin-mock-dev-server"
import { isEmail, isStrength, ResponseData } from "../shared/utils"
import { user } from "./user.data"

export default defineMock({
  url: "/api/forge",
  enabled: true,
  method: "POST",
  body: ({ body }): ResponseData => {
    if (isStrength(body.password) && isEmail(body.account) && body.code == 1234) {
      const [GetUser] = user
      const item = GetUser().filter(item => item["account"] == body.account)[0]
      user.value.push({ ...item, password: body.password })
      return { message: "修改成功", data: { verify: true }, timestamp: Date.now() }
    } else {
      return { message: "修改失败", data: { verify: false }, timestamp: Date.now() }
    }
  },
})
