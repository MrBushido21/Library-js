import { Router, type Request, type Response } from "express";

const router = Router()
router.get("/registration", (req: Request, res: Response) => {
    res.sendFile("index.html", { root: "./pages" });
});
router.get("/login", (req: Request, res: Response) => {
    res.sendFile("index.html", { root: "./pages" });
});

export default router