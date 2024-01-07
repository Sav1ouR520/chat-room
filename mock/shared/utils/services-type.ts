import { WebSocket } from "ws"

// env 变量
const ACCESS_KEY = process.env.MOCK_ACCESS_KEY || "unknown"
const REFRESH_KEY = process.env.MOCK_REFRESH_KEY || "unknown"
const REFRESH_TIME = Number(process.env.MOCK_REFRESH_TIME)
const ACCESS_TIME = Number(process.env.MOCK_ACCESS_TIME)
const API_URL = process.env.VITE_API_URL

// token、response、websocket类型
type TokenPayload = { id: string; exp: number; iat: number }
type ResponseData<T = any> = { action: boolean; data: T; message: string; timestamp: number }
type Connection = { userId: string; ws: WebSocket }

export { type ResponseData, TokenPayload, Connection, ACCESS_KEY, REFRESH_KEY, REFRESH_TIME, ACCESS_TIME, API_URL }
