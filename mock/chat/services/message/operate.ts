import { Connection, WSRequestData } from "@shared"
import { sendMessage } from "./send"

const message = (connections: Connection[], userId: string, data: WSRequestData) => {
  if (data["operation"] === "recall") {
    return
  } else if (data["operation"] === "send") {
    sendMessage(connections, userId, data["data"])
  }
}

export { message }
