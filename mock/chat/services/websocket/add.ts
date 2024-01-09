import { MockRequest } from "vite-plugin-mock-dev-server"
import { ACCESS_KEY, Connection, createApiResData } from "@shared"
import type { WebSocket } from "ws"
import jwt from "jsonwebtoken"

// 将连接的websocket加入
export const addWebSocket = (ws: WebSocket, connections: Connection[], req: MockRequest) => {
  try {
    const userId: string = jwt.verify(req.headers["sec-websocket-protocol"]!, ACCESS_KEY)["userId"]
    const connection = connections.find(connection => connection.userId === userId)
    !connection ? connections.push({ userId, ws, roomId: null }) : (connection["ws"] = ws)
    console.log(`[连接数:${connections.length}][连接成功][userId:${userId}]`)
  } catch (err) {
    ws.send(createApiResData({ message: "token有问题", action: false }))
  }
}
