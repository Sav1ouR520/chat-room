import { ACCESS_KEY, ACCESS_TIME, API_URL, REFRESH_KEY, REFRESH_TIME, createApiResData, getUserId, users } from "@shared"
import { defineMock } from "vite-plugin-mock-dev-server"
import jwt from "jsonwebtoken"

export default defineMock({
  url: API_URL + "/refresh",
  method: "POST",
  response(req, res) {
    const authorization = req.headers.authorization!.replace("Bearer ", "")
    const userId = getUserId(req, res, REFRESH_KEY)
    if (userId) {
      const user = users.value.find(user => user.userId === userId)
      if (user && user.refreshToken === authorization) {
        user.refreshToken = jwt.sign({ userId }, REFRESH_KEY, { expiresIn: REFRESH_TIME })
        res.setHeader("Refresh-Token", user.refreshToken)
        res.setHeader("Access-Token", jwt.sign({ userId }, ACCESS_KEY, { expiresIn: ACCESS_TIME }))
        res.end(createApiResData({ message: "用户凭证刷新成功" }))
      } else {
        res.statusCode = 401
        res.end(createApiResData({ message: "用户凭证认证失败", action: false }))
      }
    }
  },
})
