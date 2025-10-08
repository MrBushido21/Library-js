import { sqlRun } from "./db.constructor.js"

export const createTableUsers = async (): Promise<void> => {
    await sqlRun(`
        CREATE TABLE IF NOT EXISTS users (
        id NUMBER PRIMARY KEY,
        username TEXT NOT NULL,
        password TEXT NOT NULL
        );
        `)
}
export const createTableBooks = async (): Promise<void> => {
    await sqlRun(`
        CREATE TABLE IF NOT EXISTS users (
        id NUMBER PRIMARY KEY,
        username TEXT NOT NULL,
        password TEXT NOT NULL
        );
        `)
}

//Переписать и декомпозировать