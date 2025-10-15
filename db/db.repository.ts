import type { UsersType } from "../types/types.js";
import { isUser } from "../utils/utils.js";
import { sqlAll, sqlGet, sqlRun } from "./db.constructor.js";
// Create
export const createUsers =  async (user: UsersType): Promise<void> => {
    const {id, password_hash, email, status, created_at, updated_at, refresh_token} = user

    await sqlRun(`
            INSERT INTO users (id, email, password_hash, status, created_at, updated_at, refresh_token)
            VALUES (?,?,?,?,?,?,?);        
        `, [id, email, password_hash, status, created_at, updated_at, refresh_token])
}
//Update
export const updateUsers =  async (user: UsersType): Promise<void> => {
    const {id, password_hash, email} = user

    await sqlRun(`
            UPDATE users SET email = ? password_hash = ? 
            WHERE id = ?             
        `, [email, password_hash, id])
}
//GetOne
export const getUserForId =  async (id: number): Promise<UsersType> => {
    const user: UsersType = await sqlGet(`
            SELECT * FROM users
            WHERE id = ?;
        `, [id])
    if (!isUser(user)) {
        console.log(`Unknow format of data, Data: ${user}`);      
    } 
    return user
}


export const getUserForEmail = async (email: string): Promise<UsersType> => {
    const user: UsersType  = await sqlGet(`
           SELECT * FROM users
           WHERE email = ?
       `,
       [email]
       );   
       if (!isUser(user)) {
           console.log(`Unknow format of data in 'getUserForEmail', Data: ${user}`);      
       } 
       return user
}
export const getUserForToken = async (token: string): Promise<UsersType> => {
    const user: UsersType  = await sqlGet(`
           SELECT * FROM users
           WHERE refresh_token = ?
       `,
       [token]
       );   
       if (!isUser(user)) {
           console.log(`Unknow format of data in 'getUserForEmail', Data: ${user}`);      
       } 
       return user
}
//GetAll
export const getUsers =  async (): Promise<UsersType[]> => {
   const users:UsersType[] = await sqlAll(`SELECT * FROM users`); 
   if(!Array.isArray(users)) {
    console.log(`Unknow format of data, Data: ${users}`);
   } 
   
   return users
}

//Delete
export const deleteUser = async (id: number): Promise<void> => {
    await sqlRun(`
        DELETE FROM users
        WHERE id = ?
        `, [id]);
}
export const deleteAll = async (): Promise<void> => {
    await sqlRun(`DELETE FROM users`);
}
