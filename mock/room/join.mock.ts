import { defineMock } from "vite-plugin-mock-dev-server"
import { API_URL, generateMember, getUserId, members, rooms, users } from "../shared"

export default defineMock({
  url: API_URL + "/room/join",
  method: "POST",
  response(req, res) {
    const userId = getUserId(req, res)
    if (userId) {
      const room = rooms.value.find(item => item.code === req.body["invitation"])
      const user = users.value.find(item => item.userId === userId)
      if (room) {
        const member = members.value.find(item => item.userId == userId && item.roomId === room.roomId)
        if (!member) {
          members.value.push(generateMember(room.roomId, userId, user!.userName))
          res.end(JSON.stringify({ message: "成功加入聊天室", data: null, action: true, timestamp: Date.now() }))
        } else {
          res.end(JSON.stringify({ message: "已经在聊天室中", data: null, action: false, timestamp: Date.now() }))
        }
      } else {
        res.end(JSON.stringify({ message: "未找到聊天室", data: null, action: false, timestamp: Date.now() }))
      }
    }
  },
})
