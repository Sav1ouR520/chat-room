import { defineMock } from "vite-plugin-mock-dev-server"
import { API_URL, createApiResData, getUserId, members, messages } from "@shared"

export default defineMock({
  url: API_URL + "/message/list",
  method: "GET",
  response(req, res) {
    const userId = getUserId(req, res)
    if (userId) {
      const member = members.value.find(item => item.userId === userId && item.roomId === req.query["roomId"])
      if (member) {
        const data = messages.value.filter(message => message.roomId === req.query["roomId"]).map(message => ({ ...message, roomId: undefined }))
        res.end(createApiResData({ message: `聊天信息获取成功`, data }))
      } else {
        res.end(createApiResData({ message: `聊天信息获取失败`, action: false }))
      }
    }
  },
})
