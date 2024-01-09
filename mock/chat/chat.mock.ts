import { MockRequest, defineMock } from "vite-plugin-mock-dev-server"
import { ACCESS_KEY, API_URL, Connection, createApiResData, users, WSRequestData } from "@shared"
import { addWebSocket, deleteWebSocket, messageService, roomService } from "./services"
import type { WebSocket } from "ws"
import jwt from "jsonwebtoken"
import { userService } from "./services/user"

const connections: Connection[] = []

export default defineMock({
  url: API_URL + "/chat",
  ws: true,
  setup(wss) {
    wss.on("connection", (ws: WebSocket, req: MockRequest) => {
      addWebSocket(ws, connections, req)
      ws.on("close", () => deleteWebSocket(ws, connections))
      ws.on("message", (raw: Buffer) => {
        try {
          const data: WSRequestData = JSON.parse(String(raw))
          const user = users.value.find(item => item.userId === jwt.verify(req.headers["sec-websocket-protocol"]!, ACCESS_KEY)["userId"]) // 检验用户真实
          if (data.type === "message") messageService(connections, user, data)
          else if (data.type === "room") roomService(connections, user, data)
          else if (data.type === "user") userService(connections, user, data)
          else throw SyntaxError
        } catch (err) {
          if (err instanceof SyntaxError) {
            ws.send(createApiResData({ action: false, message: "请求数据不是规定格式" }))
          } else {
            ws.send(createApiResData({ action: false, message: "用户凭证认证失败" }))
          }
        }
      })
    })
  },
})
