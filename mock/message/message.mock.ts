import { defineMock } from "vite-plugin-mock-dev-server"
import { ResponseData } from "../utils"
import { message } from "./message.data"

export default defineMock({
  url: "/api/message",
  enabled: true,
  method: "GET",
  body: ({ query }): ResponseData => {
    return { message: `${query["roomId"]}获取成功`, data: message.value, timestamp: Date.now() }
  },
})
