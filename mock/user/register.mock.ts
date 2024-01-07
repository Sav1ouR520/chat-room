import { faker } from "@faker-js/faker"
import { defineBaseMock, ResponseData, isStrength, isEmail, users } from "../shared"

export default defineBaseMock({
  url: "/register",
  enabled: true,
  method: "POST",
  body: ({ body }): ResponseData => {
    if (isStrength(body.password) && isEmail(body.account) && body.code) {
      users.value.push({
        userId: faker.string.uuid(),
        password: body.password,
        account: body.account,
        userName: faker.finance.accountName(),
        registerTime: new Date(),
        userIcon: "",
        refreshToken: "",
      })
      return { message: "注册成功", data: { verify: true }, timestamp: Date.now() }
    } else {
      return { message: "注册失败", data: { verify: false }, timestamp: Date.now() }
    }
  },
})
