import { defineMock } from "vite-plugin-mock-dev-server"
import { API_URL, getUserId, members, users } from "../shared"

export default defineMock({
  url: API_URL + "/member/info",
  method: "GET",
  response(req, res) {
    const userId = getUserId(req, res)
    if (userId) {
      const admin = members.value.find(item => item.roomId === req.query["roomId"] && item.userId === userId)
      if (admin?.role === "admin") {
        const member = members.value.find(item => item.roomId === req.query["roomId"] && item.memberId === req.query["memberId"])
        const user = users.value.find(item => item.userId == member!.userId)
        res.end({ message: "成员信息获取成功", data: { ...member, user: { userId: user!.userId, userIcon: user!.userIcon }, userId: undefined }, action: true, timestamp: Date.now() })
      } else {
        res.end({ message: "成员信息获取失败", data: null, action: false, timestamp: Date.now() })
      }
    }
  },
})
