import { defineMock } from "vite-plugin-mock-dev-server"
import { ResponseData } from "../shared/utils"

export default defineMock({
  url: "/api/room",
  enabled: true,
  method: "POST",
  body: (): ResponseData => {
    return { message: `成功加入聊天室`, data: { verify: true }, timestamp: Date.now() }
  },
})
