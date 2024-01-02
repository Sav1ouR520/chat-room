import { defineMock } from "vite-plugin-mock-dev-server"
import { ResponseData } from "../shared/utils"
import { list } from "./room.data"

export default defineMock({
  url: "/api/room",
  enabled: true,
  method: "PUT",
  body: ({ body }): ResponseData => {
    const [GetRoom] = list
    const index = GetRoom().findIndex(room => room.roomId === body["roomId"])
    if (index >= 0) {
      if (body["roomName"]) list.value[index].roomName = body["roomName"]
      if (body["roomIcon"]) list.value[index].roomIcon = "/api/img/" + body["roomIcon"]["newFilename"]
    }
    return { message: "修改成功", data: { verify: true }, timestamp: Date.now() }
  },
})
