import { MockRequest, defineMock } from "vite-plugin-mock-dev-server"
import { ACCESS_KEY, API_URL, Connection, createApiResData, WSRequestData } from "@shared"
import { addWebSocket, deleteWebSocket, pingWebSocket, message } from "./services"
import type { WebSocket } from "ws"
import jwt from "jsonwebtoken"

const connections: Connection[] = []

export default defineMock({
  url: API_URL + "/chat",
  ws: true,
  setup(wss) {
    wss.on("connection", (ws: WebSocket, req: MockRequest) => {
      addWebSocket(connections, ws, req)
      ws.on("close", () => deleteWebSocket(connections, ws))
      ws.on("message", (raw: Buffer) => {
        try {
          const data: WSRequestData = JSON.parse(String(raw))
          const userId = jwt.verify(req.headers["sec-websocket-protocol"]!, ACCESS_KEY)["userId"] // 检验用户真实
          if (data["type"] === "message") message(connections, userId, data)
          else if (data["type"] === "ping") pingWebSocket(connections, userId, data)
        } catch (err) {
          if (err instanceof SyntaxError) {
            ws.send(createApiResData({ action: false, message: "Data不是JSON格式" }))
          } else {
            ws.send(createApiResData({ action: false, message: "用户凭证认证失败" }))
          }
        }
      })
    })
  },
})
