import { defineMockData } from "vite-plugin-mock-dev-server"
import dayjs from "dayjs"
import { faker } from "@faker-js/faker"

const room = defineMockData("room", {
  owner: faker.internet.userName(),
  createdTime: dayjs(faker.date.past()).format("HH:mm a"),
})

const generate = () => ({
  roomId: faker.string.uuid(),
  roomName: faker.word.noun(),
  roomIcon: faker.image.avatar(),
  lastMessage: {
    memberName: faker.internet.userName(),
    message: faker.lorem.sentence(),
    sendTime: dayjs(faker.date.past()).format("HH:mm a"),
  },
  owner: "019261fe-d423-3e24-373d-9164fe6f5c03",
})

const list = defineMockData("chat-list", Array.from({ length: 10 }, generate))

export { list, room }
