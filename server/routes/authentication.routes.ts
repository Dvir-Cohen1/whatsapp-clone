import express from "express";
import { login, register } from "../controllers/authentication.controllers";
const router = express.Router();
import { UnauthorizeError } from "../errors/Error";

router.post("/register", register);
router.post("/login", login);
router.delete("/logout");
router.post("/refresh-token");
router.post("/access-token");

export default router;
