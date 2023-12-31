import { defineMock } from "vite-plugin-mock-dev-server"
import { ResponseData } from "../utils"
import { user } from "./user.data"

export default defineMock({
  url: "/api/user",
  enabled: true,
  method: "GET",
  body: (): ResponseData => ({
    message: "获取成功",
    data: {
      userIcon: user.value[0].userIcon,
      userName: user.value[0].userName,
      account: user.value[0].account,
      registerTime: user.value[0].registerTime,
    },
    timestamp: Date.now(),
  }),
})
