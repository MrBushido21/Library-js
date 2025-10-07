import type { UsersType } from "../types/types.js";

export const isUser = (data: unknown): data is UsersType => {
    const user = data as UsersType
    return Boolean(user && typeof user === 'object' && user.id && user.username && user.password)
}