import { defineMock } from "vite-plugin-mock-dev-server"
import { ResponseData } from "../shared/utils"
import { room, list } from "./room.data"

export default defineMock({
  url: "/api/room/:id",
  enabled: true,
  method: "GET",
  body: ({ params }): ResponseData => {
    const [GetList] = list
    const { roomIcon, roomId, roomName } = GetList().filter(item => item.roomId === params["id"])[0]
    return { message: `room:${params["id"]}获取成功`, data: { ...room.value, roomIcon, roomId, roomName }, timestamp: Date.now() }
  },
})
