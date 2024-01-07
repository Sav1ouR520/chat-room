import { MockRequest } from "vite-plugin-mock-dev-server"
import { ACCESS_KEY, Member, defineBaseMock, generateMessage, members, messages, rooms, users } from "../shared"
import type { WebSocket } from "ws"
import jwt from "jsonwebtoken"

const connections: { userId: string; ws: WebSocket }[] = []

export default defineBaseMock({
  url: "/chat",
  ws: true,
  setup(wss) {
    wss.on("connection", (ws: WebSocket, req: MockRequest) => {
      try {
        const authorization = req.headers["sec-websocket-protocol"]
        if (authorization) {
          const userId: string = jwt.verify(authorization, ACCESS_KEY)["userId"]
          if (!connections.find(connection => connection.userId === userId)) connections.push({ userId, ws })
        }
      } catch (err) {
        ws.send("token有问题")
      }
      ws.on("open", () => ws.send("与服务器取得连接"))
      ws.on("message", (raw: Buffer) => {
        const data = JSON.parse(String(raw))
        try {
          // 检验用户真实
          const userId = jwt.verify(req.headers["sec-websocket-protocol"]!, ACCESS_KEY)["userId"]
          const member = members.value.find(member => member.userId === userId && member.roomId === data["roomId"])
          // 判断用户是否存在于该房间
          if (member && data["type"] === "message") sendMessage(member, data["roomId"], data["message"])
        } catch (err) {
          ws.send("token有问题")
        }
      })
    })
  },
})

const sendMessage = (member: Member, roomId: string, msg: string) => {
  // 添加消息到数据库
  const message = generateMessage(roomId, member.memberId, msg)
  messages.value.push(message)

  // 找到房间
  const room = rooms.value.find(item => item.roomId == roomId)

  // 解构member数据
  const { memberId, memberName } = member

  // 输出消息
  console.log(`[${room!.roomName}]${member.memberName}:${msg}`)

  // 通知消息
  connections.forEach(connection => {
    // 通知现在这个房间的在线用户
    const item = members.value.find(member => member.userId === connection.userId && member.roomId === roomId)

    // 解构userIcon
    const userIcon = users.value.find(user => user.userId === member.userId)!.userIcon
    if (item) {
      connection.ws.send(JSON.stringify({ message: "New Message", timestamp: new Date(), data: { roomId, type: "message", message: { ...message, roomId: undefined, memberId: undefined, member: { memberId, memberName }, user: { userIcon } } } }))
    }
  })
}
