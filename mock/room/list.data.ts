import { defineMockData } from "vite-plugin-mock-dev-server"
import dayjs from "dayjs"
import { faker } from "@faker-js/faker"

const generate = () => ({
  roomId: faker.string.uuid(),
  roomName: faker.word.noun(),
  roomIcon: faker.image.avatar(),
  lastMessage: {
    memberName: faker.internet.userName(),
    message: faker.lorem.sentence(),
    sendTime: dayjs(faker.date.past()).format("HH:mm a"),
  },
})

export const list = defineMockData("chat-list", Array.from({ length: 30 }, generate))
