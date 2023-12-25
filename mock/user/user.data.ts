import { defineMockData } from "vite-plugin-mock-dev-server"
import { faker } from "@faker-js/faker"

export const user = defineMockData("user", [
  { id: "1", account: "admin@admin.com", password: "admin", userName: faker.internet.userName(), userIcon: faker.internet.avatar() },
  { id: "2", account: "root@root.com", password: "root", userName: faker.internet.userName(), userIcon: faker.internet.avatar() },
])
