import { defineMock } from "vite-plugin-mock-dev-server"
import { ResponseData, ACCESS_KEY, REFRESH_KEY } from "../shared/utils"
import { user } from "./user.data"
import jwt from "jsonwebtoken"
import "dotenv/config"

const getUser = (body: Record<string, any>) => {
  const [getUser] = user
  return getUser().filter(user => user.account == body.account && user.password == body.password)[0]
}

export default defineMock({
  url: "/api/login",
  enabled: true,
  method: "POST",
  delay: 1000,
  headers: ({ body }) => {
    const user = getUser(body)
    user.refreshToken = jwt.sign({ id: user.id }, REFRESH_KEY, { expiresIn: 10 * 60 * 24 * 7 })
    if (user)
      return {
        "Access-Token": jwt.sign({ id: user.id }, ACCESS_KEY, { expiresIn: 60 }),
        "Refresh-Token": user.refreshToken,
      }
    return {}
  },
  body: ({ body }): ResponseData => {
    const user = getUser(body)
    return { message: user ? "登录成功" : "账号不存在/密码错误", data: { verify: user ? true : false }, timestamp: Date.now() }
  },
})
