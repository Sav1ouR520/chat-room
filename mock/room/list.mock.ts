import { defineMock } from "vite-plugin-mock-dev-server"
import { API_URL, rooms, members, messages, getUserId, createApiResData } from "@shared"

export default defineMock({
  url: API_URL + "/room/list",
  method: "GET",
  response(req, res) {
    const userId = getUserId(req, res)
    if (userId) {
      const roomIds = members.value.filter(item => item.userId === userId).map(item => item.roomId)
      const room_list = rooms.value.filter(item => roomIds.includes(item.roomId) && item.roomName.includes(req.query["roomName"] ? req.query["roomName"] : ""))
      const data = room_list.map(room => {
        const roomMessages = messages.value.filter(message => message.roomId === room.roomId)
        if (roomMessages.length !== 0) {
          const message = roomMessages[roomMessages.length - 1]
          const memberName = members.value.find(member => member.memberId === message.memberId)!.memberName
          return { ...room, message: { ...message, roomId: undefined, memberName }, code: undefined }
        }
        return { ...room, code: undefined }
      })
      res.end(createApiResData({ message: "聊天室列表获取成功", data }))
    }
  },
})
