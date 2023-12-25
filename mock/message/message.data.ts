import { defineMockData } from "vite-plugin-mock-dev-server"
import dayjs from "dayjs"
import { faker } from "@faker-js/faker"

const generate = () => ({
  messageId: faker.string.uuid(),
  userId: faker.string.uuid(),
  userName: faker.internet.userName(),
  userIcon: faker.image.avatar(),
  message: faker.lorem.sentence(),
  time: dayjs(faker.date.past()).format("HH:mm a"),
})

export const message = defineMockData("message", Array.from({ length: 40 }, generate))
