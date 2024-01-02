import { defineMock } from "vite-plugin-mock-dev-server"
import { ACCESS_KEY } from "../shared/utils"
import { list } from "./room.data"
import jwt from "jsonwebtoken"

export default defineMock({
  url: "/api/room",
  enabled: true,
  method: "GET",
  response(req, res) {
    const [GetList] = list
    const authorization = req.headers.authorization?.replace("Bearer ", "") as string
    try {
      const id = jwt.verify(authorization, ACCESS_KEY)["id"]
      const data = req.query["roomName"] ? GetList().filter(item => item.roomName.includes(req.query["roomName"] && item.owner == id)) : list.value
      res.end(JSON.stringify({ message: "获取成功", data, timestamp: Date.now() }))
    } catch (err) {
      res.statusCode = 401
      res.end(JSON.stringify({ message: "获取失败,token不正确或过期", data: { verify: false }, timestamp: Date.now() }))
    }
  },
})
