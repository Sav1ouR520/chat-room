import { Connection, User, WSRequestData } from "@shared"
import { switchRoom } from "./switch"
import { updateRoomIcon } from "./update"

const roomService = (connections: Connection[], user: User, data: WSRequestData) => {
  if (data["operation"] === "switch") {
    switchRoom(connections, user, data)
  } else if (data["operation"] === "roomIcon") {
    updateRoomIcon(connections, user, data)
  }
}

export { roomService }
