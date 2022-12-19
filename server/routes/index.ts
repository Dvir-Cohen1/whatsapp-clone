import { Router } from "express";
import authRoutes from "./authentication.routes";
import { NotFoundError } from "../errors/Error";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json("Server Running!");
});

router.use("/auth", authRoutes);

router.all("*", (req, res, next) => {
  next(new NotFoundError());
});

export default router