import { ACCESS_KEY, defineBaseMock, members } from "../shared"
import jwt from "jsonwebtoken"

export default defineBaseMock({
  url: "/member",
  enabled: true,
  method: "GET",
  response(req, res) {
    const authorization = req.headers.authorization!.replace("Bearer ", "")
    try {
      const userId = jwt.verify(authorization, ACCESS_KEY)["userId"]
      const member = members.value.find(item => item.userId === userId && item.roomId === req.query["roomId"])
      res.end(JSON.stringify({ message: "获取成功", data: { ...member, userId: undefined }, timestamp: Date.now() }))
    } catch (err) {
      res.statusCode = 401
      res.end(JSON.stringify({ message: "获取失败,token不正确或过期", data: { verify: false }, timestamp: Date.now() }))
    }
  },
})

// {
//   roomId: string
//   memberId: string
//   memberName: string
//   joinTime: Date
//   role: "user" | "admin"
// }
