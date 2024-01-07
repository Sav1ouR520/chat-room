import { defineMockData } from "vite-plugin-mock-dev-server"
import { faker } from "@faker-js/faker"
import { Member } from "./member.data"

type Messages = { messageId: string; roomId: string; memberId: string; message: string; sendTime: Date }
const messages = defineMockData<Messages[]>("messages_mock", [])

const generateMessage = (roomId: string, memberId: string, message: string) => ({
  messageId: faker.string.uuid(),
  roomId,
  memberId,
  message,
  sendTime: new Date(),
})

const generateOldMessage = (roomId: string, memberId: string) => ({
  messageId: faker.string.uuid(),
  roomId,
  memberId,
  message: faker.lorem.sentence(),
  sendTime: faker.date.past(),
})

const generateRandomMessage = (roomId: string, members: Member[]) => {
  const random = Math.floor(Math.random() * members.length)
  return generateOldMessage(roomId, members[random].memberId)
}

export { type Messages, messages, generateRandomMessage, generateMessage }
