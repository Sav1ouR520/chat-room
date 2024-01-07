import { faker } from "@faker-js/faker"
import { defineMock } from "vite-plugin-mock-dev-server"
import { API_URL, generateMember, getUserId, members, rooms, users } from "../shared"

export default defineMock({
  url: API_URL + "/room",
  method: "POST",
  response(req, res) {
    const userId = getUserId(req, res)
    if (userId) {
      const roomId = faker.string.uuid()
      const userName = users.value.find(item => item.userId === userId)?.userName
      const member = generateMember(roomId, userId, userName, "admin")
      members.value.push(member)
      rooms.value.push({
        owner: member.memberId,
        roomName: req.body["roomName"],
        roomIcon: "/api/img/" + req.body["roomIcon"]["newFilename"],
        createdTime: new Date(),
        roomId,
        code: faker.string.nanoid(),
      })
      res.end(JSON.stringify({ message: `成功创建聊天室`, data: null, action: true, timestamp: Date.now() }))
    }
  },
})
