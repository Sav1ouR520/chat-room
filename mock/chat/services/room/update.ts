import { Connection, User, WSRequestData, createApiResData, members, rooms } from "@shared"

type UpdateRoomIcon = WSRequestData<{ roomId: string }>

// 通知聊天室头像更新
const updateRoomIcon = (connections: Connection[], user: User, req: UpdateRoomIcon) => {
  // 找到这个房间
  const room = rooms.value.find(item => item.roomId === req.data.roomId)

  // 输出日志
  console.log(`[连接数:${connections.length}][类型:${req.type}][操作:${req.operation}][ID:${user.userId}]${user.userName}更换了聊天室头像roomId:${req.data.roomId}`)

  // 通知群友聊天室的头像被修改了
  connections.forEach(connection => {
    const member = members.value.find(item => item.userId === connection.userId && item.roomId === room.roomId)
    if (member) connection.ws.send(createApiResData({ message: "更新聊天室头像", data: { type: "room", operation: "updateIcon", wsData: { roomIcon: room.roomIcon, roomId: room.roomId } } }))
  })
}
export { updateRoomIcon }
