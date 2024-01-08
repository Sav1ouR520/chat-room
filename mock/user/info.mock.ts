import { defineMock } from "vite-plugin-mock-dev-server"
import { API_URL, createApiResData, getUserId, users } from "@shared"

export default defineMock({
  url: API_URL + "/user",
  method: "GET",
  response(req, res) {
    const userId = getUserId(req, res)
    if (userId) {
      const user = users.value.find(user => user.userId === userId)
      if (user) {
        const { userId, userIcon, userName, account, registerTime } = user
        res.end(createApiResData({ data: { userId, userIcon, userName, account, registerTime }, message: "用户信息获取成功" }))
      } else {
        res.end(createApiResData({ message: "用户信息获取失败", action: false }))
      }
    }
  },
})
