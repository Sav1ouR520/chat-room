import type { InputHTMLAttributes } from "vue"

type UploadAttr = {
  id: string
  name: string
  accept?: InputHTMLAttributes["accept"]
  more?: boolean
  uploadShow?: boolean
  position?: "top" | "left"
}

export type { UploadAttr }
