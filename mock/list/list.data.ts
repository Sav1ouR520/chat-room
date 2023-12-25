import { defineMockData } from "vite-plugin-mock-dev-server"
import dayjs from "dayjs"
import { faker } from "@faker-js/faker"

const generate = () => ({
  roomId: faker.string.uuid(),
  roomName: faker.word.noun(),
  roomIcon: faker.image.avatar(),
  userName: faker.internet.userName(),
  message: faker.lorem.sentence(),
  time: dayjs(faker.date.past()).format("HH:mm a"),
})

export const list = defineMockData("list", Array.from({ length: 10 }, generate))