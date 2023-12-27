import { defineMock } from "vite-plugin-mock-dev-server"
import { ResponseData } from "../utils"
import { list } from "./list.data"

export default defineMock({
  url: "/api/room",
  enabled: true,
  method: "GET",
  body: ({ query }): ResponseData => {
    const [GetList] = list
    let data = list.value
    if (query["roomName"]) {
      data = GetList().filter(item => item.roomName.includes(query["roomName"]))
    }
    return { message: "获取成功", data, timestamp: Date.now() }
  },
})
