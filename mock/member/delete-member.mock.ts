import { defineMock } from "vite-plugin-mock-dev-server"
import { ResponseData } from "../utils"
import { list } from "./list.data"

export default defineMock({
  url: "/api/member",
  enabled: true,
  method: "DELETE",
  body: ({ query }): ResponseData => {
    const [GetMember] = list
    list.value = GetMember().filter(item => !query.members.includes(item.memberId))
    return { message: "删除成功", data: { verify: true }, timestamp: Date.now() }
  },
})
