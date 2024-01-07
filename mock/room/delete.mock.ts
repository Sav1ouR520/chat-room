import { ACCESS_KEY, defineBaseMock, members, rooms } from "../shared"
import jwt from "jsonwebtoken"

export default defineBaseMock({
  url: "/room/:id",
  enabled: true,
  method: "DELETE",
  response(req, res) {
    const authorization = req.headers.authorization!.replace("Bearer ", "")
    try {
      const userId = jwt.verify(authorization, ACCESS_KEY)["userId"]
      const member = members.value.find(item => item.userId === userId && item.roomId === req.params["id"])
      const new_room = rooms.value.filter(item => item.roomId !== req.params["id"] && item.owner === member!.memberId)
      if (new_room.length - 1 === rooms.value.length) {
        rooms.value = new_room
        res.end(JSON.stringify({ message: "删除成功", data: { verify: true }, timestamp: Date.now() }))
      } else {
        res.end(JSON.stringify({ message: "删除失败", data: { verify: false }, timestamp: Date.now() }))
      }
    } catch (err) {
      res.statusCode = 401
      res.end(JSON.stringify({ message: "获取失败,token不正确或过期", data: { verify: false }, timestamp: Date.now() }))
    }
  },
})
