import { createReadStream } from "node:fs"
import { defineMock } from "vite-plugin-mock-dev-server"
import * as os from "os"
import path from "node:path"
import { API_URL } from "../utils"

export default defineMock({
  url: API_URL + "/img/:id",
  body: ({ params }) => createReadStream(path.join(os.tmpdir(), params["id"])),
})
