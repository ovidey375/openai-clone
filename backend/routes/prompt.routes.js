import express from "express";
import { createPrompt } from "../controller/prompt.controller.js";
import { userMiddleware } from "../middleware/user.middleware.js";

const router = express.Router();

router.post("/prompt", userMiddleware, createPrompt);

export default router;
