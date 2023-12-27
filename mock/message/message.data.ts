import { defineMockData } from "vite-plugin-mock-dev-server"
import dayjs from "dayjs"
import { faker } from "@faker-js/faker"

const generate = () => ({
  messageId: faker.string.uuid(),
  memberId: faker.string.uuid(),
  memberName: faker.internet.userName(),
  message: faker.lorem.sentence(),
  sendTime: dayjs(faker.date.past()).format("HH:mm a"),
  user: {
    userIcon: faker.image.avatar(),
  },
})

export const message = defineMockData("message", Array.from({ length: 40 }, generate))
