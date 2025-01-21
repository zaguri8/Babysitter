import express from "express";

import * as AuthController from "../controllers/auth.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.get("/me", authMiddleware, AuthController.me);

export default router;