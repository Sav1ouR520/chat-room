import { ACCESS_KEY, defineBaseMock, members, rooms } from "../shared"
import jwt from "jsonwebtoken"

export default defineBaseMock({
  url: "/room",
  enabled: true,
  method: "PUT",
  response(req, res) {
    const authorization = req.headers.authorization!.replace("Bearer ", "")
    try {
      const userId = jwt.verify(authorization, ACCESS_KEY)["userId"]
      const member = members.value.find(item => item.userId === userId && item.roomId === req.body["roomId"])
      const room = rooms.value.find(item => item.roomId === req.body["roomId"] && item.owner === member!.memberId)
      if (room) {
        if (req.body["roomName"]) room.roomName = req.body["roomName"]
        if (req.body["roomIcon"]) room.roomIcon = "/api/img/" + req.body["roomIcon"]["newFilename"]
        res.end(JSON.stringify({ message: "修改成功", data: { verify: true }, timestamp: Date.now() }))
      } else {
        res.end(JSON.stringify({ message: "修改失败", data: { verify: false }, timestamp: Date.now() }))
      }
    } catch (err) {
      res.statusCode = 401
      res.end(JSON.stringify({ message: "获取失败,token不正确或过期", data: { verify: false }, timestamp: Date.now() }))
    }
  },
})
