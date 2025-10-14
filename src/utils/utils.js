import bcrypt from "bcryptjs";
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
//# sourceMappingURL=utils.js.map