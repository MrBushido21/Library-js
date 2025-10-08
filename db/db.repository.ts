import type { UsersType } from "../types/types.js";
import { isUser } from "../utils/utils.js";
import { sqlAll, sqlGet, sqlRun } from "./db.constructor.js";
// Create
export const createUsers =  async (user: UsersType): Promise<void> => {
    const {id, password, username} = user

    await sqlRun(`
            INSERT INTO users (id, username, password)
            VALUES (?,?,?);        
        `, [id, username, password])
}
//Update
export const updateUsers =  async (user: UsersType): Promise<void> => {
    const {id, password, username} = user

    await sqlRun(`
            UPDATE users SET username = ? password = ? 
            WHERE id = ?             
        `, [username, password, id])
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


export const getUserForUsername = async (username: string): Promise<UsersType> => {
    const user: UsersType  = await sqlGet(`
           SELECT * FROM users
           WHERE username = ?
       `,
       [username]
       );   
       if (!isUser(user)) {
           console.log(`Unknow format of data, Data: ${user}`);      
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
