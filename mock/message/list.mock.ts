import { ResponseData, defineBaseMock, members, messages, users } from "../shared"

export default defineBaseMock({
  url: "/message/list",
  enabled: true,
  method: "GET",
  body: ({ query }): ResponseData => {
    const message_list = messages.value.filter(message => message.roomId === query["roomId"])
    const data = message_list.map(message => {
      const member = members.value.find(member => member.memberId === message.memberId)
      const user = users.value.find(user => user.userId === member!.userId)
      return { ...message, memberId: undefined, member: { memberId: member!.memberId, memberName: member!.memberName }, user: { userIcon: user!.userIcon }, roomId: undefined }
    })
    return { message: `获取成功`, data, timestamp: Date.now() }
  },
})
//  {
//    memberId: undefined
//    member: {
//      memberId: string
//      memberName: string
//    }
//    user: {
//      userIcon: string
//    }
//    messageId: string
//    message: string
//    sendTime: Date
//  }[]
