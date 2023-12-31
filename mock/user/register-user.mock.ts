import { defineMock } from "vite-plugin-mock-dev-server"
import { isEmail, isStrength, ResponseData } from "../utils"
import { user } from "./user.data"
import { faker } from "@faker-js/faker"

export default defineMock({
  url: "/api/register",
  enabled: true,
  method: "POST",
  body: ({ body }): ResponseData => {
    if (isStrength(body.password) && isEmail(body.account) && body.code == 1234) {
      user.value.push({ id: faker.string.uuid(), password: body.password, account: body.account, userName: faker.finance.accountName(), registerTime: new Date(), userIcon: "" })
      return { message: "注册成功", data: { verify: true }, timestamp: Date.now() }
    } else {
      return { message: "注册失败", data: { verify: false }, timestamp: Date.now() }
    }
  },
})
