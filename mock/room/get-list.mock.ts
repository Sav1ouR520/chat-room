import { defineMock } from "vite-plugin-mock-dev-server"
import { ResponseData } from "../utils"
import { list } from "./room.data"

export default defineMock({
  url: "/api/room",
  enabled: true,
  method: "GET",
  body: ({ query }): ResponseData => {
    const [GetList] = list
    const data = query["roomName"] ? GetList().filter(item => item.roomName.includes(query["roomName"])) : list.value
    return { message: "获取成功", data, timestamp: Date.now() }
  },
})
