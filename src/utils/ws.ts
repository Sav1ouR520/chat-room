import { TokenStore } from "@/stores"
import type { WSResData } from "@/types/ws-res-data"
import { useToast } from "vue-toastification"

let sharedWebSocket: ReturnType<typeof useWebSocket<string>>

export const useWS = () => {
  const token = TokenStore()
  const toast = useToast()
  if (!sharedWebSocket) {
    sharedWebSocket = useWebSocket("ws://localhost:5173/api/chat", {
      autoReconnect: { retries: 3, delay: 1000, onFailed: () => toast.error("error") },
      protocols: [token.accessToken],
    })
    watch(sharedWebSocket.data, () => {
      const resData: WSResData = JSON.parse(sharedWebSocket.data.value!)
      if (!resData.action) toast.error(resData.message)
    })
  }
  return sharedWebSocket
}
