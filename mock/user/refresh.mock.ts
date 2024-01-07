import jwt from "jsonwebtoken"
import { ACCESS_KEY, ACCESS_TIME, REFRESH_KEY, REFRESH_TIME, defineBaseMock, users } from "../shared"

export default defineBaseMock({
  url: "/refresh",
  enabled: true,
  method: "POST",
  response(req, res) {
    const authorization = req.headers.authorization!.replace("Bearer ", "")
    try {
      const userId = jwt.verify(authorization, REFRESH_KEY)["userId"]
      const user = users.value.find(user => user.userId === userId)
      if (user && user.refreshToken === authorization) {
        user.refreshToken = jwt.sign({ userId }, REFRESH_KEY, { expiresIn: REFRESH_TIME })
        res.setHeader("Refresh-Token", user.refreshToken)
        res.setHeader("Access-Token", jwt.sign({ userId }, ACCESS_KEY, { expiresIn: ACCESS_TIME }))
        res.end(JSON.stringify({ message: "刷新成功", data: { verify: true }, timestamp: Date.now() }))
      } else {
        res.statusCode = 401
        res.end(JSON.stringify({ message: "刷新失败,token不正确或过期", data: { verify: false }, timestamp: Date.now() }))
      }
    } catch (err) {
      res.statusCode = 401
      res.end(JSON.stringify({ message: "刷新失败,token不正确或过期", data: { verify: false }, timestamp: Date.now() }))
    }
  },
})
