import { MockRequest } from "vite-plugin-mock-dev-server"
import { ACCESS_KEY, Connection } from "../utils"
import type { WebSocket } from "ws"
import jwt from "jsonwebtoken"

// 将连接的websocket加入
export const addWebSocket = (connections: Connection[], ws: WebSocket, req: MockRequest) => {
  try {
    const userId: string = jwt.verify(req.headers["sec-websocket-protocol"]!, ACCESS_KEY)["userId"]
    const connection = connections.find(connection => connection.userId === userId)
    !connection ? connections.push({ userId, ws }) : (connection["ws"] = ws)
    console.log(`[连接数:${connections.length}][连接成功][userId:${userId}]`)
  } catch (err) {
    ws.send("token有问题")
  }
}
