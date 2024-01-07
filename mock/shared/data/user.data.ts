import { defineMockData } from "vite-plugin-mock-dev-server"
import { faker } from "@faker-js/faker"

type User = { userId: string; account: string; password: string; userName: string; userIcon: string; registerTime: Date; refreshToken: string }[]

const users = defineMockData<User>("user", [])

const DEFAULT_USER = [
  { userId: "MOCKUSERADMIN", account: "admin@admin.com", password: "admin", userName: faker.internet.userName(), userIcon: faker.internet.avatar(), registerTime: faker.date.past(), refreshToken: "" },
  { userId: "MOCKUSERROOT", account: "root@root.com", password: "root", userName: faker.internet.userName(), userIcon: faker.internet.avatar(), registerTime: faker.date.past(), refreshToken: "" },
]

const generateUser = () => ({
  userId: faker.string.uuid(),
  account: faker.internet.email(),
  password: faker.internet.password(),
  userName: faker.internet.userName(),
  userIcon: faker.internet.avatar(),
  registerTime: faker.date.past(),
  refreshToken: "",
})

export { type User, users, DEFAULT_USER, generateUser }
