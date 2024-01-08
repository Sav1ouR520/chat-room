import { Connection } from "@shared"

// 处理客户端发过来的ping
export const pingWebSocket = (connections: Connection[], userId: string, data: any) => {
  console.log(`[连接数:${connections.length}][${data["type"]}][userId:${userId}]`)
}
