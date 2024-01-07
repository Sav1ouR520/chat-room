import { MockRequest } from "vite-plugin-mock-dev-server"
import { ACCESS_KEY } from ".."
import jwt from "jsonwebtoken"

// 类型提示不用在意
import Cookies from "cookies"
import http from "node:http"

type MockResponse = http.ServerResponse<http.IncomingMessage> & {
  setCookie: (name: string, value?: string | null, option?: Cookies.SetOption) => void
}

const getUserId = (req: MockRequest, res: MockResponse, key = ACCESS_KEY) => {
  try {
    const authorization = req.headers.authorization?.replace("Bearer ", "") as string
    return jwt.verify(authorization, key)["userId"] as string
  } catch (err) {
    res.statusCode = 401
    res.end(JSON.stringify({ message: "用户凭证认证失败", data: null, action: false, timestamp: Date.now() }))
  }
}

export { getUserId }
