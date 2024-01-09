import { Connection, User, WSRequestData } from "@shared"
import { updateUserIcon } from "./update"

const userService = (connections: Connection[], user: User, data: WSRequestData) => {
  if (data["operation"] === "userIcon") {
    updateUserIcon(connections, user, data)
  }
}

export { userService }
