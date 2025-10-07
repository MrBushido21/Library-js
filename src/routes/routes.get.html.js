import { Router } from "express";
const router = Router();
router.get("/registration", (req, res) => {
    res.sendFile("index.html", { root: "./pages" });
});
router.get("/login", (req, res) => {
    res.sendFile("index.html", { root: "./pages" });
});
export default router;
//# sourceMappingURL=routes.get.html.js.map