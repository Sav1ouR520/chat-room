const ACCESS_KEY = process.env.MOCK_ACCESS_KEY || "unknown"
const REFRESH_KEY = process.env.MOCK_REFRESH_KEY || "unknown"
const REFRESH_TIME = Number(process.env.MOCK_REFRESH_TIME)
const ACCESS_TIME = Number(process.env.MOCK_ACCESS_TIME)

type TokenPayload = {
  id: string
  exp: number
  iat: number
}

export { type TokenPayload, ACCESS_KEY, REFRESH_KEY, REFRESH_TIME, ACCESS_TIME }
