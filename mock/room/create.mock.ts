import { ACCESS_KEY, defineBaseMock, generateMember, members, rooms, users } from "../shared"
import jwt from "jsonwebtoken"
import { faker } from "@faker-js/faker"

export default defineBaseMock({
  url: "/room",
  enabled: true,
  method: "POST",
  response(req, res) {
    const authorization = req.headers.authorization!.replace("Bearer ", "")
    try {
      const roomId = faker.string.uuid()
      const userId = jwt.verify(authorization, ACCESS_KEY)["userId"]
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
      res.end(JSON.stringify({ message: `成功创建聊天室`, data: { verify: true }, timestamp: Date.now() }))
    } catch (err) {
      res.statusCode = 401
      res.end(JSON.stringify({ message: "获取失败,token不正确或过期", data: { verify: false }, timestamp: Date.now() }))
    }
  },
})
