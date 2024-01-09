import { Connection, User, WSRequestData, createApiResData, members } from "@shared"

// 通知聊天室成员头像更像
const updateUserIcon = (connections: Connection[], user: User, req: WSRequestData) => {
  // 获取用户所有的聊天室
  const room_list = members.value.filter(item => item.userId === user.userId).map(item => item.roomId)

  // 输出日志
  console.log(`[连接数:${connections.length}][类型:${req.type}][操作:${req.operation}][ID:${user.userId}]${user.userName}更换头像`)

  // 通知其他人该用户修改了头像，在聊天室里面的
  connections.forEach(connection => {
    const member = members.value.find(item => item.userId === connection.userId && room_list.includes(item.roomId))
    if (member) connection.ws.send(createApiResData({ message: "群友更新头像", data: { type: "member", operation: "updateIcon", wsData: { userIcon: user.userIcon, userId: user.userId } } }))
  })
}
export { updateUserIcon }
