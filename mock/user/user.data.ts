import { defineMockData } from "vite-plugin-mock-dev-server"
import { faker } from "@faker-js/faker"

export const user = defineMockData("user", [
  { id: faker.string.uuid(), account: "admin@admin.com", password: "admin", userName: faker.internet.userName(), userIcon: faker.internet.avatar(), registerTime: faker.date.anytime() },
  { id: faker.string.uuid(), account: "root@root.com", password: "root", userName: faker.internet.userName(), userIcon: faker.internet.avatar(), registerTime: faker.date.anytime() },
])
