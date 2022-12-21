import express from "express";
import {
  login,
  logout,
  register,
} from "../controllers/authentication.controllers";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/logout", logout);
router.post("/refresh-token");
router.post("/access-token");

export default router;
