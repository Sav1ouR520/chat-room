import { defineMock } from "vite-plugin-mock-dev-server"
import { API_URL, createApiResData, getUserId, members, rooms } from "@shared"

export default defineMock({
  url: API_URL + "/room",
  method: "PUT",
  response(req, res) {
    const userId = getUserId(req, res)
    if (userId) {
      const member = members.value.find(item => item.userId === userId && item.roomId === req.body["roomId"])
      const room = rooms.value.find(item => item.roomId === req.body["roomId"] && item.owner === member!.memberId)
      if (room) {
        if (req.body["roomName"]) room.roomName = req.body["roomName"]
        if (req.body["roomIcon"]) room.roomIcon = "/api/img/" + req.body["roomIcon"]["newFilename"]
        res.end(createApiResData({ message: "聊天室信息修改成功" }))
      } else {
        res.end(createApiResData({ message: "聊天室信息修改失败", action: false }))
      }
    }
  },
})
