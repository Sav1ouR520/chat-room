import { MockRequest, defineMock } from "vite-plugin-mock-dev-server"
import { ACCESS_KEY, API_URL, Connection, addWebSocket, deleteWebSocket, pingWebSocket, sendMessage } from ".."
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
          console.log(JSON.parse(String(raw)))
          const data = JSON.parse(String(raw))
          const userId = jwt.verify(req.headers["sec-websocket-protocol"]!, ACCESS_KEY)["userId"] // 检验用户真实
          if (data["type"] === "message") sendMessage(connections, userId, data)
          else if (data["type"] === "ping") pingWebSocket(connections, userId, data)
        } catch (err) {
          if (err instanceof SyntaxError) ws.send(JSON.stringify({ message: "data不是json" }))
          else ws.send(JSON.stringify({ message: "data不是json" }))
        }
      })
    })
  },
})
