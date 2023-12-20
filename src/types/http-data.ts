type ResponseData<T = any> = {
  data: T
  message: string
  timestamp: number
}

type RequestQuery<T extends object = object, K extends keyof T = keyof T> = {
  [P in K]: T[P]
}

export type { RequestQuery, ResponseData }
