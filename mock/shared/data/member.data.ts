import { defineMockData } from "vite-plugin-mock-dev-server"
import { faker } from "@faker-js/faker"

type Member = { roomId: string; memberId: string; memberName: string; userId: string; joinTime: Date; role: "user" | "admin" }
const members = defineMockData<Member[]>("members_mock", [])

const generateMember = (roomId: string, userId: string, memberName = faker.internet.userName(), role: "user" | "admin" = "user") => ({
  roomId,
  memberId: faker.string.uuid(),
  memberName,
  userId,
  joinTime: faker.date.anytime(),
  role,
})

export { type Member, members, generateMember }
