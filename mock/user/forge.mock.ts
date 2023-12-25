import { defineMock } from "vite-plugin-mock-dev-server"
import { isEmail, isStrength, ResponseData } from "../utils"
import { user } from "./user.data"
import { faker } from "@faker-js/faker"

export default defineMock({
  url: "/api/forge",
  enabled: true,
  method: "POST",
  body: ({ body }): ResponseData => {
    if (isStrength(body.password) && isEmail(body.account) && body.code == 1234) {
      user.value.push({ id: faker.string.uuid(), password: body.password, account: body.account, username: faker.finance.accountName() })
      return { message: "修改成功", data: { verify: true }, timestamp: Date.now() }
    } else {
      return { message: "修改失败", data: { verify: false }, timestamp: Date.now() }
    }
  },
})
