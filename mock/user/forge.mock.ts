import { defineBaseMock, users, ResponseData, isStrength, isEmail } from "../shared"

export default defineBaseMock({
  url: "/forge",
  enabled: true,
  method: "POST",
  body: ({ body }): ResponseData => {
    if (isStrength(body.password) && isEmail(body.account) && body.code) {
      const user = users.value.find(item => item["account"] == body.account)
      if (user) user.password = body.password
      return { message: "修改成功", data: { verify: true }, timestamp: Date.now() }
    } else {
      return { message: "修改失败", data: { verify: false }, timestamp: Date.now() }
    }
  },
})
