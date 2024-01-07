import { ACCESS_KEY, defineBaseMock, members, rooms } from "../shared"
import jwt from "jsonwebtoken"

export default defineBaseMock({
  url: "/room/:id",
  enabled: true,
  method: "GET",
  response(req, res) {
    const authorization = req.headers.authorization!.replace("Bearer ", "")
    try {
      jwt.verify(authorization, ACCESS_KEY)["userId"]
      const room = rooms.value.find(item => item.roomId === req.params["id"])
      const member = members.value.find(item => item.memberId == room!.owner)
      res.end(JSON.stringify({ message: "获取成功", data: { ...room, owner: { ...member, roomId: undefined } }, timestamp: Date.now() }))
    } catch (err) {
      res.statusCode = 401
      res.end(JSON.stringify({ message: "获取失败,token不正确或过期", data: { verify: false }, timestamp: Date.now() }))
    }
  },
})
// {
//     owner: {
//         memberId: string;
//         memberName: string;
//         userId: string;
//         joinTime: Date;
//         role: "user" | "admin";
//     } ;
//     roomId: string;
//     roomName: string;
//     roomIcon: string;
//     createdTime: Date;
//     code: string;
// }
