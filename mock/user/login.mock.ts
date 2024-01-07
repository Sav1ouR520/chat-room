import { defineMock } from "vite-plugin-mock-dev-server"
import { ACCESS_KEY, ACCESS_TIME, REFRESH_KEY, REFRESH_TIME, users, ResponseData, API_URL } from "../shared"
import jwt from "jsonwebtoken"

const getUser = (body: Record<string, any>) => users.value.find(user => user.account == body.account && user.password == body.password)

export default defineMock({
  url: API_URL + "/login",
  method: "POST",
  headers: ({ body }) => {
    const user = getUser(body)
    user!.refreshToken = jwt.sign({ userId: user!.userId }, REFRESH_KEY, { expiresIn: REFRESH_TIME })
    if (user)
      return {
        "Access-Token": jwt.sign({ userId: user.userId }, ACCESS_KEY, { expiresIn: ACCESS_TIME }),
        "Refresh-Token": user.refreshToken,
      }
    return {}
  },
  body: ({ body }): ResponseData => {
    const user = getUser(body)
    return { message: user ? "登录成功" : "账号不存在/密码错误", data: null, action: user ? true : false, timestamp: Date.now() }
  },
})
