import { defineMock } from "vite-plugin-mock-dev-server"
import { API_URL, createApiResData, getUserId, members } from "@shared"

export default defineMock({
  url: API_URL + "/member",
  method: "GET",
  response(req, res) {
    const userId = getUserId(req, res)
    if (userId) {
      const member = members.value.find(item => item.userId === userId && item.roomId === req.query["roomId"])
      res.end(createApiResData({ message: "个人成员信息获取成功", data: { ...member, userId: undefined } }))
    }
  },
})
