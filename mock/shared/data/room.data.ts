import { defineMockData } from "vite-plugin-mock-dev-server"
import { faker } from "@faker-js/faker"

type Room = { roomId: string; roomName: string; roomIcon: string; owner: string; createdTime: Date; code: string }
const rooms = defineMockData<Room[]>("rooms_mock", [])
const generateRoom = (roomId: string, owner: string) => ({
  roomId,
  roomName: faker.word.noun(),
  roomIcon: faker.image.avatar(),
  owner,
  createdTime: faker.date.past(),
  code: faker.string.nanoid(),
})

export { type Room, rooms, generateRoom }
