import { defineMock } from "vite-plugin-mock-dev-server"
import { API_URL, createApiResData, members } from "@shared"

export default defineMock({
  url: API_URL + "/member",
  method: "DELETE",
  body: ({ query }) => {
    members.value = members.value.filter(item => !query["members"].includes(item.memberId))
    return createApiResData({ message: "删除成功" })
  },
})
