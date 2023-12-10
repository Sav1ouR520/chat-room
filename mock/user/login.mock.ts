import { defineMock } from "vite-plugin-mock-dev-server"

export default defineMock({
  url: "/api/login",
  enabled: true,
  method: "POST",
  validator: {
    body: { account: "root", password: "root" },
  },
  body: () => ({
    code: 200,
    message: "success",
    data: {
      verify: true,
    },
    action: true,
    timestamp: new Date(),
  }),
})
