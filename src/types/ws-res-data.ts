import type { ChatMessageItem } from "@/apis"
import type { ResponseData } from "@/types"

type WSResData<T = null> = ResponseData<{ type: string; wsData: T; operation: string }>

type SendMessage = WSResData<ChatMessageItem & { roomId: string; memberName: string }>
type UpdateMemeberIcon = WSResData<{ userIcon: string; userId: string }>
type UpdateRoomIcon = WSResData<{ roomIcon: string; roomId: string }>

export type { WSResData, SendMessage, UpdateMemeberIcon, UpdateRoomIcon }
