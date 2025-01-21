import express from "express";

import * as BabysitterController from "../controllers/babysitter.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", authMiddleware, BabysitterController.getBabysitters);
router.post("/", authMiddleware, BabysitterController.scheduleEvent);
router.delete("/:id", authMiddleware, BabysitterController.deleteEvent);

export default router;
