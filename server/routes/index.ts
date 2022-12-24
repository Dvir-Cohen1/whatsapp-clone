import { Router } from "express";
import authRoutes from "./authentication.routes";
import { NotFoundError } from "../errors/Error";
import { authJwtToken } from "../middlewares/authentication.middleware";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json("Server Running!");
});


router.get("/onlyToken", authJwtToken, (req, res) => {
  res.send("you can see me only if you have a token");
});

router.use("/auth", authRoutes);
router.all("*", (req, res, next) => {
  next(new NotFoundError());
});


export default router