import { WebSocket } from "ws"

// env 变量
const ACCESS_KEY = process.env.MOCK_ACCESS_KEY || "unknown"
const REFRESH_KEY = process.env.MOCK_REFRESH_KEY || "unknown"
const REFRESH_TIME = Number(process.env.MOCK_REFRESH_TIME)
const ACCESS_TIME = Number(process.env.MOCK_ACCESS_TIME)
const API_URL = process.env.VITE_API_URL

// token、response、websocket类型
type TokenPayload = { id: string; exp: number; iat: number }
const createApiResData = ({ message, action = true, data = null, timestamp = Date.now() }) => JSON.stringify({ action, data, message, timestamp })
type Connection = { userId: string; ws: WebSocket; roomId: string | null }
type WSRequestData<T = any> = { type: string; operation: string; data: T }

const isEmail = (value: string) => {
  const email_valid = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return email_valid.test(value)
}

const isStrength = (value: string) => {
  const password_valid = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]/
  return password_valid.test(value)
}

export { isEmail, isStrength, createApiResData, type WSRequestData, TokenPayload, Connection, ACCESS_KEY, REFRESH_KEY, REFRESH_TIME, ACCESS_TIME, API_URL }
