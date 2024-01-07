import { ACCESS_KEY, defineBaseMock, members, users } from "../shared"
import jwt from "jsonwebtoken"
export default defineBaseMock({
  url: "/member/list",
  enabled: true,
  method: "GET",
  response(req, res) {
    const authorization = req.headers.authorization!.replace("Bearer ", "")
    try {
      const userId = jwt.verify(authorization, ACCESS_KEY)["userId"]
      const member = members.value.find(item => item.userId == userId)
      if (member) {
        const member_List = members.value.filter(item => item.roomId === req.query["roomId"])
        const data = member_List.map(member => {
          const user = users.value.find(user => user.userId === member.userId)
          return { ...member, userId: undefined, user: { userIcon: user!.userIcon, userId: user!.userId }, roomId: undefined }
        })
        res.end(JSON.stringify({ message: "获取成功", data, timestamp: Date.now() }))
      } else {
        res.end(JSON.stringify({ message: "获取失败", data: null, timestamp: Date.now() }))
      }
    } catch (err) {
      res.statusCode = 401
      res.end(JSON.stringify({ message: "获取失败,token不正确或过期", data: { verify: false }, timestamp: Date.now() }))
    }
  },
})

// {
//   user: {
//     userIcon: string
//     userId: string
//   }
//   memberId: string
//   memberName: string
//   joinTime: Date
//   role: "user" | "admin"
// }[]
