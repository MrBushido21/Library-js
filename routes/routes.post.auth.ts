import { Router, type CookieOptions, type Request, type Response } from "express";
import type { PayloadType, UsersType } from "../types/types.js";
import { createUsers, getUserForEmail, getUserForToken } from "../db/db.repository.js";
import { checkAuth, comparePass, createToken, dateNow, decodedToken, hashedPass, options, refreshToken } from "../utils/utils.js";
import type { JwtPayload } from "jsonwebtoken";


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
  const [access_token, refresh_token] = token

  if (refresh_token) {
    user.refresh_token = refresh_token
  }

  createUsers(user)
  res.cookie("refresh_token", refresh_token, options);
  res.json({
    access_token: access_token,
  })
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
  const [access_token, refresh_token] = token

  const isMatch: boolean = await comparePass(password_hash, data.password_hash)

  if (data && isMatch) {
    res.cookie("refresh_token", refresh_token, options);
    res.json({
      access_token: access_token,
    })
  }
  return res.send("Unkorrect login or password")
});

//Обновление акцес токена
router.post("/refresh", async (req: Request<{}, {}, UsersType, {}>, res: Response) => {
  const { email, id, status } = req.body
  
  const refresh_token = req.cookies.refresh_token
  
  if (!refresh_token) {
   return res.status(403).json({ message: 'haven`t token' })
  }

  const data = await getUserForToken(refresh_token)
  if (!data) {
   return res.status(403).json({ message: 'Not found user' })
  }

  const payload: PayloadType = {
    email: email,
    id: id,
    status: status
  }

  const token = refreshToken(refresh_token, payload)
  
  if (!token) {
   return res.status(403).json({ message: 'Uncorrect token'})
  }

  res.json({access_token: token})
})

//Логаут
router.post("/logout", (req:Request<{}, {}, {}, {}, CookieOptions>, res:Response) => {
  res.clearCookie("refresh_token"); // удаляем cookie
  res.json({ message: "Logged out" });
});


//Админ
router.post('/admin', checkAuth, (req: Request, res: Response) => {
  const token = req.headers.authorization
  let decoded = null
  if (token) {
    decoded = decodedToken(token)
  }
  const status = decoded?.status

  if (status) {
    status === "admin" ? res.status(200).json({message: "You are admin"}) : res.status(403).json({message: "You are not admin"})
  }
  
})
export default router;