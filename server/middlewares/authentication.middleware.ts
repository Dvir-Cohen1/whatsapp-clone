import {
  verifyAccessToken,
} from "../helpers/token.helper";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { UnauthorizeError } from "../errors/Error";
import { createNewAccessToken } from "../controllers/authentication.controllers";


export const authJwtToken = async (req: any, res: any, next: any) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return next(new UnauthorizeError());
    verifyAccessToken(token);
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return await createNewAccessToken(req, res, next);
    }
    if (error instanceof JsonWebTokenError) {
      return next(new UnauthorizeError(error.message));
    }
  }
};

// - add route + plus controller that create new access token case on refresh token

// - when access token expired then the middleware will create one for them and set as well
