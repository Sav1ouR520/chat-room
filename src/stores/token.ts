import type { TokenPayload } from "@/types"
import { jwtDecode } from "jwt-decode"

export const TokenStore = defineStore("TokenStore", {
  state: () => ({
    accessToken: "",
    refreshToken: "",
    isRefreshing: false,
  }),
  getters: {
    accessTokenPayload: state => {
      if (state.accessToken) {
        const payload: TokenPayload = jwtDecode(state.accessToken)
        return { ...payload, isExpire: payload.exp < Date.now() / 1000 }
      }
    },
    refreshTokenPayload: state => {
      if (state.refreshToken) {
        const payload: TokenPayload = jwtDecode(state.refreshToken)
        return { ...payload, isExpire: payload.exp < Date.now() / 1000 }
      }
    },
  },
  actions: {
    isExpire() {
      if (this.accessTokenPayload?.isExpire) this.accessToken = ""
      if (this.refreshTokenPayload?.isExpire) this.accessToken = ""
    },
  },
  persist: {
    storage: localStorage,
    paths: ["accessToken", "refreshToken"],
  },
})
