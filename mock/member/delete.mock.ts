import { defineMock } from "vite-plugin-mock-dev-server"
import { API_URL, ResponseData, members } from "../shared"

export default defineMock({
  url: API_URL + "/member",
  method: "DELETE",
  body: ({ query }): ResponseData => {
    members.value = members.value.filter(item => !query["members"].includes(item.memberId))
    return { message: "删除成功", data: null, action: true, timestamp: Date.now() }
  },
})
