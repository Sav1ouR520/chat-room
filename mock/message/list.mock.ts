import { defineMock } from "vite-plugin-mock-dev-server"
import { API_URL, getUserId, members, messages, users } from "../shared"

export default defineMock({
  url: API_URL + "/message/list",
  method: "GET",
  response(req, res) {
    const userId = getUserId(req, res)
    if (userId) {
      const member = members.value.filter(item => item.userId === userId && item.roomId === req.query["roomId"])
      if (member) {
        const message_list = messages.value.filter(message => message.roomId === req.query["roomId"])
        const data = message_list.map(message => {
          const member = members.value.find(member => member.memberId === message.memberId)
          const user = users.value.find(user => user.userId === member!.userId)
          return { ...message, memberId: undefined, member: { memberId: member!.memberId, memberName: member!.memberName }, user: { userIcon: user!.userIcon }, roomId: undefined }
        })
        res.end(JSON.stringify({ message: `聊天信息获取成功`, data, timestamp: Date.now(), action: true }))
      } else {
        res.end(JSON.stringify({ message: `聊天信息获取失败`, data: null, timestamp: Date.now(), action: false }))
      }
    }
  },
})
