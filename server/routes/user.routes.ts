import express from "express";
import { getLoggedInUser } from "../controllers/authentication.controllers";

const router = express.Router();
router.get("/loggedInUser", getLoggedInUser);
export default router;
