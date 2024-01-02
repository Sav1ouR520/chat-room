import { defineMockData } from "vite-plugin-mock-dev-server"
import { faker } from "@faker-js/faker"

const generate = () => ({
  memberId: faker.string.uuid(),
  memberName: faker.internet.userName(),
  user: { userIcon: faker.image.avatar() },
  joinTime: faker.date.anytime(),
  role: "user",
})

export const member = defineMockData("member-list", Array.from({ length: 30 }, generate))
