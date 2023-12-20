import { defineMockData } from "vite-plugin-mock-dev-server"
export const user = defineMockData("user", [
  { id: "1", account: "admin@admin.com", password: "admin", username: "admin" },
  { id: "2", account: "root@root.com", password: "root", username: "admin" },
])
