import { ACCESS_KEY, defineBaseMock, rooms, members, messages } from "../shared"
import jwt from "jsonwebtoken"

export default defineBaseMock({
  url: "/room/list",
  enabled: true,
  method: "GET",
  response(req, res) {
    const authorization = req.headers.authorization!.replace("Bearer ", "")
    try {
      const userId = jwt.verify(authorization, ACCESS_KEY)["userId"]
      const roomIds = members.value.filter(item => item.userId === userId).map(item => item.roomId)
      const room_list = rooms.value.filter(item => roomIds.includes(item.roomId) && item.roomName.includes(req.query["roomName"] ? req.query["roomName"] : ""))
      const data = room_list.map(room => {
        const roomMessages = messages.value.filter(message => message.roomId === room.roomId)
        if (roomMessages.length !== 0) {
          const message = roomMessages[roomMessages.length - 1]
          const memberName = members.value.find(member => member.memberId === message.memberId)!.memberName
          return { ...room, message: { ...message, roomId: undefined, memberName }, code: undefined }
        }
        return { ...room, code: undefined }
      })
      res.end(JSON.stringify({ message: "获取成功", data, timestamp: Date.now() }))
    } catch (err) {
      res.statusCode = 401
      res.end(JSON.stringify({ message: "获取失败,token不正确或过期", data: { verify: false }, timestamp: Date.now() }))
    }
  },
})

// {
//     message: {
//         memberName: string;
//         messageId: string;
//         memberId: string;
//         message: string;
//         sendTime: Date;
//     };
//     roomId: string;
//     roomName: string;
//     roomIcon: string;
//     owner: string;
//     createdTime: Date;
// } []
