import { Connection } from "../utils"
import type { WebSocket } from "ws"

// 将断开的websocket删除
export const deleteWebSocket = (connections: Connection[], ws: WebSocket) => {
  const index = connections.findIndex(connection => connection.ws === ws)
  if (index >= 0) {
    const userId = connections[index].userId
    connections.splice(index, 1)
    console.log(`[连接数:${connections.length}][连接断开][userId:${userId}]`)
  }
}
