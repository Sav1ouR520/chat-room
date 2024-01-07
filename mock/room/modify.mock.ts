import { defineMock } from "vite-plugin-mock-dev-server"
import { API_URL, getUserId, members, rooms } from "../shared"

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
        res.end(JSON.stringify({ message: "聊天室信息修改成功", data: null, action: true, timestamp: Date.now() }))
      } else {
        res.end(JSON.stringify({ message: "聊天室信息修改失败", data: null, action: false, timestamp: Date.now() }))
      }
    }
  },
})
