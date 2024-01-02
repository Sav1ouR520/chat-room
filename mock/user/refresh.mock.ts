import { defineMock } from "vite-plugin-mock-dev-server"
import jwt from "jsonwebtoken"
import { ACCESS_KEY, REFRESH_KEY } from "../shared/utils"
import { user } from "./user.data"

export default defineMock({
  url: "/api/refresh",
  enabled: true,
  method: "POST",
  response(req, res) {
    const [getUser] = user
    const authorization = req.headers.authorization?.replace("Bearer ", "") as string
    try {
      const id = jwt.verify(authorization, REFRESH_KEY)["id"]
      const index = getUser().findIndex(user => user.id === id)
      if (index >= 0 && user.value[index].refreshToken === authorization) {
        user.value[index].refreshToken = jwt.sign({ id }, REFRESH_KEY, { expiresIn: 10 * 60 * 24 * 7 })
        res.setHeader("Refresh-Token", user.value[index].refreshToken)
        res.setHeader("Access-Token", jwt.sign({ id }, ACCESS_KEY, { expiresIn: 60 }))
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
