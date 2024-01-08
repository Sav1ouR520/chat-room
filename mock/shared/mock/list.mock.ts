import { defineMock } from "vite-plugin-mock-dev-server"
import { API_URL, generateMockData, members, messages, rooms, users } from "@shared"

export default defineMock([
  { url: API_URL + "/list/user", body: () => users.value },
  { url: API_URL + "/list/member", body: () => members.value },
  { url: API_URL + "/list/room", body: () => rooms.value },
  { url: API_URL + "/list/message", body: () => messages.value },
])

generateMockData()
