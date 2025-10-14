import express, { type Request, type Response } from "express";
import authRouter from "./routes/routes.post.auth.js"
import htmlRouter from "./routes/routes.get.html.js"
import { createTableUsers } from "./db/db.createTable.js";
import { deleteAll, deleteUser, getUsers } from "./db/db.repository.js";


const app = express();
const port = 3000;

const run = async () => {
await createTableUsers()

const jsonBodyModdleweare = express.json()
app.use(jsonBodyModdleweare)

app.use("/", htmlRouter);

app.use('/auth', authRouter)

app.get('/', async (req, res) => {
  // deleteAll()
  const data = await getUsers() 
  res.send(data)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
}

run()