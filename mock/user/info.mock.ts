import { defineMock } from "vite-plugin-mock-dev-server"
import { user } from "./user.data"
import { ACCESS_KEY } from "../shared/utils"
import jwt from "jsonwebtoken"

export default defineMock({
  url: "/api/user",
  enabled: true,
  method: "GET",
  response(req, res) {
    const [GetUser] = user
    const authorization = req.headers.authorization?.replace("Bearer ", "") as string
    try {
      const index = GetUser().findIndex(user => user.id === jwt.verify(authorization, ACCESS_KEY)["id"])
      const { userIcon, userName, account, registerTime } = user.value[index]
      res.end(JSON.stringify({ message: "获取成功", data: { userIcon, userName, account, registerTime }, timestamp: Date.now() }))
    } catch (err) {
      res.statusCode = 401
      res.end(JSON.stringify({ message: "获取失败,token不正确或过期", data: { verify: false }, timestamp: Date.now() }))
    }
  },
})
