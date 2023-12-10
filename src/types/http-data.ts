type ResponseData<T> = {
  action: boolean
  data: T
  message: string
  code: number
  timestamp: Date
}

type RequestQuery<T extends object = object, K extends keyof T = keyof T> = {
  [P in K]: T[P]
}

export type { RequestQuery, ResponseData }
