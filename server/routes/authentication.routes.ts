import express from "express";
import { register } from "../controllers/authentication.controllers";
const router = express.Router();
import { UnauthorizeError } from "../errors/Error";

router.post("/login");
router.post("/register", register);
router.get("/test", (req, res, next) => {
  next(new UnauthorizeError());
  //   try {
  //     throw Error;
  //   } catch (error) {
  //     next(error);
  //   }
});
router.delete("/logout");

router.post("/refresh-token");
router.post("/access-token");

export default router;
