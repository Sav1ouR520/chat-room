import { defineMock } from "vite-plugin-mock-dev-server"
import { API_URL, getUserId, users } from "../shared"

export default defineMock({
  url: API_URL + "/user",
  method: "GET",
  response(req, res) {
    const userId = getUserId(req, res)
    if (userId) {
      const user = users.value.find(user => user.userId === userId)
      if (user) {
        const { userId, userIcon, userName, account, registerTime } = user
        res.end(JSON.stringify({ message: "用户信息获取成功", data: { userId, userIcon, userName, account, registerTime }, action: true, timestamp: Date.now() }))
      } else {
        res.end(JSON.stringify({ message: "用户信息获取失败", data: null, action: false, timestamp: Date.now() }))
      }
    }
  },
})
