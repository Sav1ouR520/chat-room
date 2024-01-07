import path from "path"
import { createDefineMock } from "vite-plugin-mock-dev-server"

const defineBaseMock = createDefineMock(mock => {
  mock.url = path.join("/api", mock.url)
})

export { defineBaseMock }
