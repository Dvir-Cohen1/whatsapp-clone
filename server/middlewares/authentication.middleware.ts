import { verifyAccessToken } from "../helpers/token.helper";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { UnauthorizeError } from "../errors/Error";
import { createNewAccessToken } from "../controllers/authentication.controllers";
import { getCookieValue } from "../helpers/cookies.helper";

export const authJwtToken = async (req: any, res: any, next: any) => {
  try {
    const accessToken = getCookieValue(req.headers.cookie, "accessToken");
    const refreshToken = getCookieValue(req.headers.cookie, "refreshToken");

    if (!refreshToken) return next(new UnauthorizeError());

    const decoded = verifyAccessToken(accessToken);
    req.user = decoded
    
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
