import { Connection, User, members } from "@shared"
import { WSRequestData } from "@shared"

// 请求的数据类型
type SwitchRoom = WSRequestData<{ roomId: string }>

// 获取用户目前在注视哪个房间
const switchRoom = (connections: Connection[], user: User, req: SwitchRoom) => {
  const roomId = req.data.roomId
  if (roomId) {
    const member = members.value.find(item => item.roomId === roomId && item.userId === user.userId)
    if (member) connections.find(item => item.userId === user.userId).roomId = roomId
  }
  console.log(`[连接数:${connections.length}][类型:${req.type}][操作:${req.operation}][ID:${user.userId}]${user.userName}切换房间roomId:${roomId}`)
}

export { switchRoom }
