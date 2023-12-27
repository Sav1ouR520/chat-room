import { defineMockData } from "vite-plugin-mock-dev-server"
import dayjs from "dayjs"
import { faker } from "@faker-js/faker"

const generate = () => ({
  memberId: faker.string.uuid(),
  memberName: faker.internet.userName(),
  user: { userIcon: faker.image.avatar() },
  joinTime: dayjs(faker.date.past()).format("HH:mm a"),
})

export const list = defineMockData("member-list", Array.from({ length: 30 }, generate))
