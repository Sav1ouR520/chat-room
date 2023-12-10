import { fetchLogin, type LoginRequest } from "@/apis/user"

export const login = (user: LoginRequest) => useRequest(() => fetchLogin(user))
