import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//Константы
export const options = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
};
//Проверка на пользователя
export const isUser = (data) => {
    const user = data;
    return Boolean(user && typeof user === 'object' && user.id && user.email && user.password_hash && user.status && user.created_at && user.updated_at);
};
//Создание текущей даты
export const dateNow = new Date().toISOString();
//Хеширование пароля
export const hashedPass = async (password_hash) => {
    const pass = await bcrypt.hash(password_hash, 10);
    return pass;
};
//Сравнение паролей
export const comparePass = async (password_hash, passwordInput) => {
    return await bcrypt.compare(password_hash, passwordInput);
};
// Создание токена
function createTokenUtils(payload, secret) {
    const token = jwt.sign(payload, secret, {
        algorithm: "HS256",
        expiresIn: "10m"
    });
    return token;
}
const accsesSecret = "super_secret_key_accses";
const refreshSecret = "super_secret_key_refresh";
export const createToken = (payload) => {
    const accsesToken = createTokenUtils(payload, accsesSecret);
    const refreshToken = createTokenUtils(payload, refreshSecret);
    const tokensArr = [accsesToken, refreshToken];
    return tokensArr;
};
// Првоерка токена
export const refreshToken = (refresh_token, payload) => {
    try {
        const decoded = jwt.verify(refresh_token, refreshSecret);
        const accsesToken = createTokenUtils(payload, accsesSecret);
        return accsesToken;
    }
    catch (error) {
        console.error(error);
        return null;
    }
};
//# sourceMappingURL=utils.js.map