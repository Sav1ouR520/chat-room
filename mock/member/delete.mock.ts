import { ResponseData, defineBaseMock, members } from "../shared"
export default defineBaseMock({
  url: "/member",
  enabled: true,
  method: "DELETE",
  body: ({ query }): ResponseData => {
    members.value = members.value.filter(item => !query["members"].includes(item.memberId))
    return { message: "删除成功", data: { verify: true }, timestamp: Date.now() }
  },
})
