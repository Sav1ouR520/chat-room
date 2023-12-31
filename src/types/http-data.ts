type ResponseData<T = any> = {
  data: T
  message: string
  timestamp: number
}

type VerifyReponse = ResponseData<{
  verify: boolean
}>

type RequestQuery<T extends object = object, K extends keyof T = keyof T> = {
  [P in K]: T[P]
}

export type { RequestQuery, ResponseData, VerifyReponse }
