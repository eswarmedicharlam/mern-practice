import { Router } from "express";
import { loginUser, registerUser } from "../controller/auth.controller";

const router: Router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
