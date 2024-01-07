import { defineMock } from "vite-plugin-mock-dev-server"
import { API_URL, getUserId, members, rooms } from "../shared"

export default defineMock({
  url: API_URL + "/room/:id",
  method: "DELETE",
  response(req, res) {
    const userId = getUserId(req, res)
    if (userId) {
      const member = members.value.find(item => item.userId === userId && item.roomId === req.params["id"])
      const new_room = rooms.value.filter(item => item.roomId !== req.params["id"] && item.owner === member!.memberId)
      if (new_room.length - 1 === rooms.value.length) {
        rooms.value = new_room
        res.end(JSON.stringify({ message: "聊天室删除成功", data: null, action: true, timestamp: Date.now() }))
      } else {
        res.end(JSON.stringify({ message: "聊天室删除失败", data: null, action: false, timestamp: Date.now() }))
      }
    }
  },
})
