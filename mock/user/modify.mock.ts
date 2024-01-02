import { defineMock } from "vite-plugin-mock-dev-server"
import { user } from "./user.data"
import jwt from "jsonwebtoken"
import { ACCESS_KEY } from "../shared/utils"

export default defineMock({
  url: "/api/user",
  enabled: true,
  method: "PUT",
  response(req, res) {
    const { headers, body } = req
    const [GetUser] = user
    const authorization = headers.authorization?.replace("Bearer ", "") as string
    try {
      const index = GetUser().findIndex(user => user.id === jwt.verify(authorization, ACCESS_KEY)["id"])
      if (index >= 0) {
        if (body["userName"]) user.value[index].userName = body["userName"]
        if (body["userIcon"]) user.value[index].userIcon = "/api/img/" + body["userIcon"]["newFilename"]
      }
      res.end(JSON.stringify({ message: "修改成功", data: { verify: true }, timestamp: Date.now() }))
    } catch (err) {
      res.statusCode = 401
      res.end(JSON.stringify({ message: "修改失败,用户凭证认证失败", data: { verify: false }, timestamp: Date.now() }))
    }
  },
})
