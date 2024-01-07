import { defineMock } from "vite-plugin-mock-dev-server"
import { API_URL, getUserId, members, rooms } from "../shared"

export default defineMock({
  url: API_URL + "/room/:id",
  method: "GET",
  response(req, res) {
    const userId = getUserId(req, res)
    if (userId) {
      const room = rooms.value.find(item => item.roomId === req.params["id"])
      const member = members.value.find(item => item.memberId == room!.owner)
      res.end(JSON.stringify({ message: "聊天室信息获取成功", data: { ...room, owner: { ...member, roomId: undefined } }, action: true, timestamp: Date.now() }))
    }
  },
})
