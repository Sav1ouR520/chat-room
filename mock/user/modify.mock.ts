import { API_URL, getUserId, users } from "../shared"
import { defineMock } from "vite-plugin-mock-dev-server"

export default defineMock({
  url: API_URL + "/user",
  method: "PUT",
  response(req, res) {
    const userId = getUserId(req, res)
    if (userId) {
      const user = users.value.find(user => user.userId === userId)
      if (user) {
        if (req.body["userName"]) user.userName = req.body["userName"]
        if (req.body["userIcon"]) user.userIcon = "/api/img/" + req.body["userIcon"]["newFilename"]
      }
      res.end(JSON.stringify({ message: "用户信息修改成功", data: null, action: true, timestamp: Date.now() }))
    }
  },
})
