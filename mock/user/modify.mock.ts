import { defineMock } from "vite-plugin-mock-dev-server"
import { ResponseData } from "../utils"

export default defineMock({
  url: "/api/user",
  enabled: true,
  method: "PUT",
  body: (): ResponseData => ({ message: "修改成功", data: { verify: true }, timestamp: Date.now() }),
})
