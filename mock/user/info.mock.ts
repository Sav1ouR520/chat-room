import { ACCESS_KEY, defineBaseMock, users } from "../shared"
import jwt from "jsonwebtoken"

export default defineBaseMock({
  url: "/user",
  enabled: true,
  method: "GET",
  response(req, res) {
    const authorization = req.headers.authorization?.replace("Bearer ", "") as string
    try {
      const user = users.value.find(user => user.userId === jwt.verify(authorization, ACCESS_KEY)["userId"])
      if (user) {
        const { userId, userIcon, userName, account, registerTime } = user
        res.end(JSON.stringify({ message: "获取成功", data: { userId, userIcon, userName, account, registerTime }, timestamp: Date.now() }))
      } else {
        res.end(JSON.stringify({ message: "获取失败", data: {}, timestamp: Date.now() }))
      }
    } catch (err) {
      res.statusCode = 401
      res.end(JSON.stringify({ message: "获取失败,token不正确或过期", data: { verify: false }, timestamp: Date.now() }))
    }
  },
})
