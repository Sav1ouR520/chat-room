import { members, generateMessage, messages, rooms, Connection, createApiResData, User } from "@shared"
import { WSRequestData } from "@shared"

// 请求的数据类型
type SendMessage = WSRequestData<{ roomId: string; message: string }>

// 处理发过来的信息
const sendMessage = (connections: Connection[], user: User, req: SendMessage) => {
  const roomId = req.data.roomId
  const member = members.value.find(item => item.userId === user.userId && item.roomId === roomId)
  // 判断用户是否存在于该房间
  if (member) {
    // 添加消息到数据库
    const message = generateMessage(roomId, member.memberId, req.data.message)
    messages.value.push(message)

    // 找到房间
    const room = rooms.value.find(item => item.roomId == roomId)

    // 输出消息
    console.log(`[连接数:${connections.length}][类型:${req["type"]}][操作:${req["operation"]}][聊天室:${room!.roomName}]${member.memberName}:${req.data.message}`)

    // 通知消息
    connections.forEach(connection => {
      // 找到现在这个房间的在线用户
      const member = members.value.find(member => member.userId === connection.userId && member.roomId === roomId)

      // 如果用户在线且再这个房间
      if (member) connection.ws.send(createApiResData({ message: "新消息", data: { type: "message", operation: "send", wsData: { ...message, memberName: member.memberName } } }))
    })
  }
}
export { sendMessage }
