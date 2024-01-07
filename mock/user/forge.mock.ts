import { defineMock } from "vite-plugin-mock-dev-server"
import { users, ResponseData, isStrength, isEmail, API_URL } from "../shared"

export default defineMock({
  url: API_URL + "/forge",
  method: "POST",
  body: ({ body }): ResponseData => {
    if (isStrength(body.password) && isEmail(body.account) && body.code) {
      const user = users.value.find(item => item["account"] == body.account)
      if (user) user.password = body.password
      return { message: "密码修改成功", data: null, action: true, timestamp: Date.now() }
    } else {
      return { message: "密码修改失败", data: null, action: false, timestamp: Date.now() }
    }
  },
})
