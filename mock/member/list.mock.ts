import { defineMock } from "vite-plugin-mock-dev-server"
import { API_URL, getUserId, members, users } from "../shared"

export default defineMock({
  url: API_URL + "/member/list",
  method: "GET",
  response(req, res) {
    const userId = getUserId(req, res)
    if (userId) {
      const member = members.value.find(item => item.userId == userId)
      if (member) {
        const member_List = members.value.filter(item => item.roomId === req.query["roomId"])
        const data = member_List.map(member => {
          const user = users.value.find(user => user.userId === member.userId)
          return { ...member, userId: undefined, user: { userIcon: user!.userIcon, userId: user!.userId }, roomId: undefined }
        })
        res.end(JSON.stringify({ message: "成员列表获取成功", data, action: true, timestamp: Date.now() }))
      } else {
        res.end(JSON.stringify({ message: "成员列表获取失败", data: null, action: false, timestamp: Date.now() }))
      }
    }
  },
})
