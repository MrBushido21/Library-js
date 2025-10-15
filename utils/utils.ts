import bcrypt from "bcryptjs";
import type { PayloadType, UsersType } from "../types/types.js";
import jwt from "jsonwebtoken"

//Проверка на пользователя
export const isUser = (data: unknown): data is UsersType => {
    const user = data as UsersType
    return Boolean(user && typeof user === 'object' && user.id && user.email && user.password_hash && user.status && user.created_at && user.updated_at)
}

//Создание текущей даты
export const dateNow = new Date().toISOString()

//Хеширование пароля
export const hashedPass = async (password_hash: string):Promise<string> => {
    const pass = await bcrypt.hash(password_hash, 10)
    return pass
} 


//Сравнение паролей

export const comparePass = async (password_hash:string, passwordInput:string): Promise<boolean> => {
    return await bcrypt.compare(password_hash, passwordInput)
}

// Создание токена
function createTokenUtils(payload:PayloadType, secret: string): string {

    const token = jwt.sign(payload, secret, {
        algorithm: "HS256",
        expiresIn: "10m"
    })

    return token
}
const accsesSecret = "super_secret_key_accses"
const refreshSecret = "super_secret_key_refresh"

export const createToken = (payload: PayloadType):string[] => {
    
    const accsesToken = createTokenUtils(payload, accsesSecret)
    const refreshToken = createTokenUtils(payload, refreshSecret)

    const tokensArr = [accsesToken, refreshToken]
    return tokensArr
}

// Првоерка токена
export const refreshToken = (refresh_token: string, payload:PayloadType): string | null => {
    try {
        const decoded = jwt.verify(refresh_token, refreshSecret)
        const accsesToken = createTokenUtils(payload, accsesSecret)
        return accsesToken
      } catch (error) {
        return null
      }
}
