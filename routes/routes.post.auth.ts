import { Router, type Request, type Response} from "express";
import type { UsersType } from "../types/types.js";
import { createUsers, getUserForUsername } from "../db/db.repository.js";

const router = Router();

// регистрация
router.post("/registration", async (req: Request<{}, {}, UsersType>, res: Response) => {
  const { username, password } = req.body;
  
  const data = await getUserForUsername(username)
  if (data) {
    return res.send("username already taken")
  }
  
  const user: UsersType = {
      id: Math.floor(Math.random() * 100000),
      username: username,
      password: password 
  }
  
  createUsers(user)
});

// логин
router.post("/login", async (req: Request<{}, {}, UsersType>, res: Response) => {
  const {username, password} = req.body
  const user = await getUserForUsername(username)
  if (!user) {
    console.log('Unknown user')
    return res.send('Unkorrect login or password')
  }
  if (username === user.username && password === user.password) {
    return res.send("Ok")
  } else {
    return res.send("Unkorrect login or password")
  }
  
});

export default router;