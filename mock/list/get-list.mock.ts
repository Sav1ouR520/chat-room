import { defineMock } from "vite-plugin-mock-dev-server"
import { ResponseData } from "../utils"
import { list } from "./list.data"

export default defineMock({
  url: "/api/list",
  enabled: true,
  method: "GET",
  body: (): ResponseData => {
    return { message: "获取成功", data: list.value, timestamp: Date.now() }
  },
})
