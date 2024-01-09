import { defineMock } from "vite-plugin-mock-dev-server"
import { API_URL, createApiResData, getUserId, members } from "@shared"

export default defineMock({
  url: API_URL + "/member",
  method: "DELETE",
  response(req, res) {
    const userId = getUserId(req, res)
    if (userId) {
      const delete_list = Array.isArray(req.query["members"]) ? req.query["members"] : [req.query["members"]]
      const admin = members.value.find(item => item.roomId === req.query["roomId"] && item.userId === userId)
      if (admin?.role === "admin") {
        const hasAdmin = delete_list.some((memberId: string) => members.value.some(item => item.memberId === memberId && item.role === "admin"))
        if (delete_list.includes(admin.memberId)) res.end(createApiResData({ message: "删除失败，不能删除自己", action: false }))
        else if (!hasAdmin) {
          members.value = members.value.filter(item => !delete_list.includes(item.memberId))
          res.end(createApiResData({ message: "删除成功" }))
        } else {
          res.end(createApiResData({ message: "删除失败，不能删除其他管理员", action: false }))
        }
      }
    }
  },
})
