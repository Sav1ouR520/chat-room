import { defineBaseMock, generateMockData, members, messages, rooms, users } from ".."

export default defineBaseMock([
  {
    url: "/list/user",
    enabled: true,
    method: "GET",
    body() {
      return users.value
    },
  },
  {
    url: "/list/member",
    enabled: true,
    method: "GET",
    body() {
      return members.value
    },
  },
  {
    url: "/list/room",
    enabled: true,
    method: "GET",
    body() {
      return rooms.value
    },
  },
  {
    url: "/list/message",
    enabled: true,
    method: "GET",
    body() {
      return messages.value
    },
  },
])

generateMockData()
