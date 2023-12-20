import { defineMock } from "vite-plugin-mock-dev-server"
export default defineMock({
  url: "/api/login",
  enabled: true,
  method: "POST",
  delay: 1000,
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
