import { ACCESS_KEY, defineBaseMock, members, users } from "../shared"
import jwt from "jsonwebtoken"

export default defineBaseMock({
  url: "/member/info",
  enabled: true,
  method: "GET",
  response(req, res) {
    const authorization = req.headers.authorization!.replace("Bearer ", "")
    try {
      const userId = jwt.verify(authorization, ACCESS_KEY)["userId"]
      const admin = members.value.find(item => item.roomId === req.query["roomId"] && item.userId === userId)
      if (admin?.role === "admin") {
        const member = members.value.find(item => item.roomId === req.query["roomId"] && item.memberId === req.query["memberId"])
        const user = users.value.find(item => item.userId == member!.userId)
        res.end({ message: "获取成功", data: { ...member, user: { userId: user!.userId, userIcon: user!.userIcon }, userId: undefined }, timestamp: Date.now() })
      } else {
        res.end({ message: "获取失败", data: null, timestamp: Date.now() })
      }
    } catch (err) {
      res.statusCode = 401
      res.end(JSON.stringify({ message: "获取失败,token不正确或过期", data: { verify: false }, timestamp: Date.now() }))
    }
  },
})

// {
//     user: {
//         userId: string;
//         userIcon: string;
//     };
//     roomId: string ;
//     memberId: string ;
//     memberName: string ;
//     joinTime: Date ;
//     role: "user" | "admin";
// }
