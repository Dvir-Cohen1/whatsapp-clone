import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
} from "../helpers/token.helper";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { UnauthorizeError } from "../errors/Error";
import { PreMiddlewareFunction } from "mongoose";

export const authJwtToken = (req: any, res: any, next: any) => {
  try {
    const token = req.headers["access-token"];
    console.log(token)
    if (!token) return res.sendStatus(401);
    const decodedToken = verifyAccessToken(token);
    next();
  } catch (error) {
    console.log(error instanceof JsonWebTokenError);
    if (error instanceof TokenExpiredError) {
      // Home work
      console.log("first");
      // CREATE LOGIC
    }
    if (error instanceof JsonWebTokenError) {
      return next(new UnauthorizeError());
    }
  }
};
