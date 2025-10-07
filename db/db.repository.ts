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
export const getUser =  async (id: number): Promise<UsersType> => {
    const data: UsersType = await sqlGet(`
            SELECT * FROM users
            WHERE id = ?;
        `, [id])
    if (!isUser(data)) {
        console.log(`Unknow format of data, Data: ${data}`);      
    } 
    return data
}
//GetAll
export const getUsers =  async (): Promise<UsersType[]> => {
   const data:UsersType[] = await sqlAll(`SELECT * FROM users`); 
   if(!Array.isArray(data)) {
    console.log(`Unknow format of data, Data: ${data}`);
   } 
   
   return data
}

//Delete
export const deleteUser = async (id: number): Promise<void> => {
    await sqlRun(`
        DELETE FROM users
        WHERE id = ?
        `, [id]);
}