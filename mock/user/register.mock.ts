import { faker } from "@faker-js/faker"
import { ResponseData, isStrength, isEmail, users, API_URL } from "../shared"
import { defineMock } from "vite-plugin-mock-dev-server"

export default defineMock({
  url: API_URL + "/register",
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
      return { message: "注册成功", data: null, action: true, timestamp: Date.now() }
    } else {
      return { message: "注册失败", data: null, action: false, timestamp: Date.now() }
    }
  },
})
