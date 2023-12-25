import { defineMock } from "vite-plugin-mock-dev-server"
import { ResponseData } from "../utils"
import { room } from "./room.data"

export default defineMock({
  url: "/api/room/:id",
  enabled: true,
  method: "GET",
  body: (): ResponseData => {
    return { message: "获取成功", data: room.value, timestamp: Date.now() }
  },
})
