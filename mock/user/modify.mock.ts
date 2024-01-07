import jwt from "jsonwebtoken"
import { ACCESS_KEY, defineBaseMock, users } from "../shared"

export default defineBaseMock({
  url: "/user",
  enabled: true,
  method: "PUT",
  response(req, res) {
    const authorization = req.headers.authorization?.replace("Bearer ", "") as string
    try {
      const user = users.value.find(user => user.userId === jwt.verify(authorization, ACCESS_KEY)["userId"])
      if (user) {
        if (req.body["userName"]) user.userName = req.body["userName"]
        if (req.body["userIcon"]) user.userIcon = "/api/img/" + req.body["userIcon"]["newFilename"]
      }
      res.end(JSON.stringify({ message: "修改成功", data: { verify: true }, timestamp: Date.now() }))
    } catch (err) {
      res.statusCode = 401
      res.end(JSON.stringify({ message: "修改失败,用户凭证认证失败", data: { verify: false }, timestamp: Date.now() }))
    }
  },
})
