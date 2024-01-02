import { defineMock } from "vite-plugin-mock-dev-server"
import { ResponseData } from "../shared/utils"
import { member } from "./member.data"

export default defineMock({
  url: "/api/member",
  enabled: true,
  method: "GET",
  body: (): ResponseData => {
    return { message: "获取成功", data: member.value, timestamp: Date.now() }
  },
})
