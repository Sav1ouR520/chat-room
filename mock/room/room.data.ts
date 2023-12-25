import { defineMockData } from "vite-plugin-mock-dev-server"
import dayjs from "dayjs"
import { faker } from "@faker-js/faker"

export const room = defineMockData("room", {
  roomId: faker.string.uuid(),
  roomName: faker.word.noun(),
  roomIcon: faker.image.avatar(),
  owner: faker.internet.userName(),
  createdTime: dayjs(faker.date.past()).format("HH:mm a"),
})
