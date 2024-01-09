import { Connection } from "@shared"
import type { WebSocket } from "ws"

// 将断开的websocket删除
export const deleteWebSocket = (ws: WebSocket, connections: Connection[]) => {
  const index = connections.findIndex(connection => connection.ws === ws)
  if (index >= 0) {
    const userId = connections[index].userId
    connections.splice(index, 1)
    console.log(`[连接数:${connections.length}][连接断开][userId:${userId}]`)
  }
}
