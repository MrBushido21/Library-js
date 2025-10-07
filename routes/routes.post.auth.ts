import { Router, type Request, type Response} from "express";
import type { UsersType } from "../types/types.js";
import sqlite3 from "sqlite3";
import { createUsers } from "../db/db.repository.js";

const router = Router();

let users: UsersType[] = [];

// регистрация
router.post("/registration", (req: Request<{}, {}, UsersType>, res: Response) => {
  const { username, password } = req.body;
  
  
  const user: UsersType = {
      id: Math.floor(Math.random() * 100000),
      username: username,
      password: password 
  }
  
  createUsers(user)
});

// логин
router.post("/login", (req: Request<{}, {}, UsersType>, res: Response) => {
    
});

export default router;