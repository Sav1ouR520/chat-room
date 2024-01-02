import { defineMock } from "vite-plugin-mock-dev-server"
import { ResponseData } from "../shared/utils"
import { member } from "./member.data"

export default defineMock({
  url: "/api/member",
  enabled: true,
  method: "DELETE",
  body: ({ query }): ResponseData => {
    const [GetMember] = member
    member.value = GetMember().filter(item => !query.members.includes(item.memberId))
    return { message: "删除成功", data: { verify: true }, timestamp: Date.now() }
  },
})
