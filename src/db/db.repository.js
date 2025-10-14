import { isUser } from "../utils/utils.js";
import { sqlAll, sqlGet, sqlRun } from "./db.constructor.js";
// Create
export const createUsers = async (user) => {
    const { id, password_hash, email, status, created_at, updated_at } = user;
    await sqlRun(`
            INSERT INTO users (id, email, password_hash, status, created_at, updated_at)
            VALUES (?,?,?,?,?,?);        
        `, [id, email, password_hash, status, created_at, updated_at]);
};
//Update
export const updateUsers = async (user) => {
    const { id, password_hash, email } = user;
    await sqlRun(`
            UPDATE users SET email = ? password_hash = ? 
            WHERE id = ?             
        `, [email, password_hash, id]);
};
//GetOne
export const getUserForId = async (id) => {
    const user = await sqlGet(`
            SELECT * FROM users
            WHERE id = ?;
        `, [id]);
    if (!isUser(user)) {
        console.log(`Unknow format of data, Data: ${user}`);
    }
    return user;
};
export const getUserForEmail = async (email) => {
    const user = await sqlGet(`
           SELECT * FROM users
           WHERE email = ?
       `, [email]);
    if (!isUser(user)) {
        console.log(`Unknow format of data in 'getUserForEmail', Data: ${user}`);
    }
    return user;
};
//GetAll
export const getUsers = async () => {
    const users = await sqlAll(`SELECT * FROM users`);
    if (!Array.isArray(users)) {
        console.log(`Unknow format of data, Data: ${users}`);
    }
    return users;
};
//Delete
export const deleteUser = async (id) => {
    await sqlRun(`
        DELETE FROM users
        WHERE id = ?
        `, [id]);
};
export const deleteAll = async () => {
    await sqlRun(`DELETE FROM users`);
};
//# sourceMappingURL=db.repository.js.map