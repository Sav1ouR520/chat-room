import { defineMock } from "vite-plugin-mock-dev-server"
import { ResponseData } from "../utils"
import { user } from "./user.data"

export default defineMock({
  url: "/api/user",
  enabled: true,
  method: "PUT",
  body: ({ body }): ResponseData => {
    const [GetUser] = user
    const index = GetUser().findIndex(user => user.id === body["userId"])
    if (index >= 0) {
      if (body["userName"]) user.value[index].userName = body["userName"]
      if (body["userIcon"]) user.value[index].userIcon = "/api/img" + body["userIcon"]["newFilename"]
    }
    return { message: "修改成功", data: { verify: true }, timestamp: Date.now() }
  },
})
