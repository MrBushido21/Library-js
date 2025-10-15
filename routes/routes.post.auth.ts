import { Router, type Request, type Response } from "express";
import type { PayloadType, UsersType } from "../types/types.js";
import { createUsers, getUserForEmail } from "../db/db.repository.js";
import { comparePass, createToken, dateNow, hashedPass, refreshToken } from "../utils/utils.js";


const router = Router();

// регистрация
router.post("/registration", async (req: Request<{}, {}, UsersType>, res: Response) => {
  const { email, password_hash } = req.body;

  const hashed = await hashedPass(password_hash)

  const data = await getUserForEmail(email)
  if (data) {
    return res.send("email already taken")
  }
  
  const user: UsersType = {
    id: Math.floor(Math.random() * 100000),
    email: email,
    password_hash: hashed,
    status: "user", 
    refresh_token: "",
    created_at: dateNow,
    updated_at: dateNow
  }

  const payload: PayloadType = {
    email: email,
    id: user.id,
    status: user.status
  }

  
  const token = createToken(payload)
  if (token[1]) {
    user.refresh_token = token[1]
  }
  
  createUsers(user)
  return res.json(token[0])
});

// логин
router.post("/login", async (req: Request<{}, {}, UsersType, {}>, res: Response) => {
  const { email, password_hash } = req.body;

  const data = await getUserForEmail(email)
  
  const payload: PayloadType = {
    email: email,
    id: data.id,
    status: data.status
  }
  const token = createToken(payload)

  const isMatch:boolean = await comparePass(password_hash, data.password_hash)

  if (data && isMatch) { 
    return res.json(token[0])
  }
  return res.send("Unkorrect login or password")
});


router.post("/refresh", async (req: Request<{}, {}, UsersType, {}>, res: Response) => {
  const { refresh_token, email, id, status} = req.body
  if (!refresh_token) {
    res.status(403).json({message: 'haven`t token'})
  }

  const data = await getUserForEmail(refresh_token)
  if (!data) {
    res.status(403).json({message: 'Not found user'})
  }

  const payload: PayloadType = {
    email: email,
    id: id,
    status: status
  }

  const token = refreshToken(refresh_token, payload)
  return res.json(token)
})

export default router;