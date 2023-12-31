import { createReadStream } from "node:fs"
import { defineMock } from "vite-plugin-mock-dev-server"
import * as os from "os"
import path from "node:path"

export default defineMock({
  url: "/api/img/:id",
  body: ({ params }) => createReadStream(path.join(os.tmpdir(), params["id"])),
})
