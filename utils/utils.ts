import bcrypt from "bcryptjs";
import type { UsersType } from "../types/types.js";

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