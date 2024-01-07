import { ACCESS_KEY, defineBaseMock, generateMember, members, rooms, users } from "../shared"
import jwt from "jsonwebtoken"

export default defineBaseMock({
  url: "/room/join",
  enabled: true,
  method: "GET",
  response(req, res) {
    const authorization = req.headers.authorization!.replace("Bearer ", "")
    try {
      const userId = jwt.verify(authorization, ACCESS_KEY)["userId"]
      const room = rooms.value.find(item => item.code === req.query["invitation"])
      const user = users.value.find(item => item.userId === userId)
      if (room) {
        const member = members.value.find(item => item.userId == userId && item.roomId === room.roomId)
        if (!member) {
          members.value.push(generateMember(room.roomId, userId, user!.userName))
          res.end(JSON.stringify({ message: "成功加入聊天室", data: { verify: true }, timestamp: Date.now() }))
        } else {
          res.end(JSON.stringify({ message: "已经在聊天室中", data: { verify: false }, timestamp: Date.now() }))
        }
      } else {
        res.end(JSON.stringify({ message: "未找到聊天室", data: { verify: false }, timestamp: Date.now() }))
      }
    } catch (err) {
      res.statusCode = 401
      res.end(JSON.stringify({ message: "获取失败,token不正确或过期", data: { verify: false }, timestamp: Date.now() }))
    }
  },
})
