import { defineMockData } from "vite-plugin-mock-dev-server"
import { faker } from "@faker-js/faker"

export const user = defineMockData("user", [
  { id: "019261fe-d423-3e24-373d-9164fe6f5c03", account: "admin@admin.com", password: "admin", userName: faker.internet.userName(), userIcon: faker.internet.avatar(), registerTime: faker.date.anytime(), refreshToken: "" },
  { id: faker.string.uuid(), account: "root@root.com", password: "root", userName: faker.internet.userName(), userIcon: faker.internet.avatar(), registerTime: faker.date.anytime(), refreshToken: "" },
])
