import { defineMock } from "vite-plugin-mock-dev-server"
import { users, createApiResData, isStrength, isEmail, API_URL } from "@shared"

export default defineMock({
  url: API_URL + "/forge",
  method: "POST",
  body: ({ body }) => {
    if (isStrength(body.password) && isEmail(body.account) && body.code) {
      const user = users.value.find(item => item["account"] == body.account)
      if (user) user.password = body.password
      return createApiResData({ message: "密码修改成功" })
    } else {
      return createApiResData({ message: "密码修改失败", action: false })
    }
  },
})
