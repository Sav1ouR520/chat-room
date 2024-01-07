import { faker } from "@faker-js/faker"
import { DEFAULT_USER, generateUser, users } from "./user.data"
import { generateMember, members } from "./member.data"
import { generateRandomMessage, messages } from "./message.data"
import { generateRoom, rooms } from "./room.data"
import _ from "lodash"

const generateMockData = () => {
  if (!rooms.value.length) {
    // 生成房间id
    const roomIds = Array.from({ length: 9 }, () => faker.string.uuid())

    // 生成用户
    const user = Array.from({ length: 28 }, () => generateUser())
    users.value.push(...DEFAULT_USER, ...user)

    // 生成固定房间
    const room = faker.string.uuid()
    const owner = generateMember(room, users.value[1].userId, users.value[1].userName, "admin")
    const other = generateMember(room, users.value[0].userId, users.value[0].userName, "user")
    rooms.value.push(generateRoom(room, owner.memberId))
    members.value.push(owner, other)

    //生成随机房间
    for (const roomId of roomIds) {
      // 生成房主id
      const owner = generateMember(roomId, users.value[0].userId, users.value[0].userName, "admin")
      rooms.value.push(generateRoom(roomId, owner.memberId))

      // 生成成员
      const randomUser = _.sampleSize(user, 15)
      const member = [owner, ...Array.from({ length: 14 }, (_, index) => generateMember(roomId, randomUser[index + 1].userId))]
      members.value.push(...member)

      // 生成消息
      messages.value.push(...Array.from({ length: 40 }, () => generateRandomMessage(roomId, member)))
    }
    console.log("========== Mock Data Generation Success ==========")
  }
}

export { generateMockData }
