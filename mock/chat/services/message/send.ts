import { members, generateMessage, messages, rooms, users, Connection, WSRequestData, createApiResData } from "@shared"

// 处理发过来的信息
const sendMessage = (connections: Connection[], userId: string, data: WSRequestData) => {
  const roomId = data["roomId"]
  const member = members.value.find(member => member.userId === userId && member.roomId === roomId)

  // 判断用户是否存在于该房间
  if (member) {
    // 添加消息到数据库
    const message = generateMessage(roomId, member.memberId, data["message"])
    messages.value.push(message)

    // 找到房间
    const room = rooms.value.find(item => item.roomId == roomId)

    // 解构member数据
    const { memberId, memberName } = member

    // 输出消息
    console.log(`[连接数:${connections.length}][${data["type"]}][${room!.roomName}]${member.memberName}:${data["message"]}`)

    // 通知消息
    connections.forEach(connection => {
      // 通知现在这个房间的在线用户
      const item = members.value.find(member => member.userId === connection.userId && member.roomId === roomId)

      // 解构userIcon
      const userIcon = users.value.find(user => user.userId === member.userId)!.userIcon

      // 如果用户在线且再这个房间
      if (item) {
        connection.ws.send(
          createApiResData({
            message: "New Message",
            data: { roomId, type: "message", message: { ...message, roomId: undefined, memberId: undefined, member: { memberId, memberName }, user: { userIcon } } },
          }),
        )
      }
    })
  }
}
export { sendMessage }
