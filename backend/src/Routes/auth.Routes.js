import express from "express";
import authController from "../Controllers/auth.controller.js";

const router = express.Router();

router.post("/register", authController.ragisterUser);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);

export default router;
