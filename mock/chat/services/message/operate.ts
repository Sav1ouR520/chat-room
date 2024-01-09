import { Connection, User, WSRequestData } from "@shared"
import { sendMessage } from "./send"

const messageService = (connections: Connection[], user: User, req: WSRequestData) => {
  if (req["operation"] === "recall") {
    return
  } else if (req["operation"] === "send") {
    sendMessage(connections, user, req)
  }
}

export { messageService }
