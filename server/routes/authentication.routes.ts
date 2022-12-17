import express from 'express';
import {register} from "../controllers/authentication.controllers";
const router = express.Router();

router.post("/login");
router.post("/register", register);
router.delete("/logout");

router.post("/refresh-token");
router.post("/access-token");

export default router;
