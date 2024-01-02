const ACCESS_KEY = process.env.MOCK_ACCESS_KEY || "unknown"
const REFRESH_KEY = process.env.MOCK_REFRESH_KEY || "unknown"

type TokenPayload = {
  id: string
  exp: number
  iat: number
}

export { type TokenPayload, ACCESS_KEY, REFRESH_KEY }
