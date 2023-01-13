import User from "../models/user.model";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../helpers/token.helper";
import {
  ServerError,
  BadRequestError,
  NotFoundError,
  UnauthorizeError,
} from "../errors/Error";
import {
  registerRequestSchema,
  loginRequestSchema,
} from "../validator/schema/authRequests";
import { validateRequest } from "../validator/request.validator";
import { verifyAccessToken } from "../helpers/token.helper";
import { getCookieValue } from "../helpers/cookies.helper";
import { IController } from "../@types/auth";
import { Request, Response, NextFunction } from "express";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password, passwordConfirm } = req.body.userData;
    if (password !== passwordConfirm)
      return next(new BadRequestError("Password dont match!"));

    const isUserAlreadyExist = await User.exists({ username });
    if (isUserAlreadyExist)
      return next(new BadRequestError("User name already exist!"));

    await validateRequest(registerRequestSchema, req.body.userData, next);
    await User.create({ ...req.body.userData });

    res.status(201).json({ error: true, message: "User Created Successfully" });
  } catch (error: any) {
    console.log(error);
    return next(new ServerError(error));
  }
};

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    await validateRequest(loginRequestSchema, req.body.userData, next);

    const { username, password } = req.body.userData;

    // get the user
    const user = await User.findOne({ username: username });
    if (!user) return next(new NotFoundError("User not found"));

    // validate password
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect)
      return next(new UnauthorizeError("Username or password incorrect"));

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.setJwtTokens(accessToken, refreshToken);

    res.cookie("accessToken", accessToken);
    res.cookie("refreshToken", refreshToken);

    res.status(200).json({
      error: false,
      message: "Logged in successfully",
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
    next(new ServerError(error.message));
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const accessToken = req.body.accessToken;
    const user = await User.findOne({ jwt_ac_token: accessToken });

    if (!user) return next(new NotFoundError("No Such User"));
    user.deleteTokens();

    res.status(200).json({
      error: false,
      message: "Logged out successfully",
    });
  } catch (error: any) {
    return next(new ServerError(error.message));
  }
}

export async function createNewAccessToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const refreshToken = getCookieValue(req.headers.cookie, "refreshToken");
    if (!refreshToken) return next(new UnauthorizeError());

    const user = await User.findOne({ jwt_rf_token: refreshToken });
    if (!user) return next(new UnauthorizeError());

    verifyAccessToken(refreshToken);

    user.jwt_ac_token = generateAccessToken(user.id);
    user.save();

    res.cookie("accessToken", user.jwt_ac_token);
    next();
  } catch (error: any) {
    return next(new ServerError(error.message));
  }
}

// TODO - create function that return logged in user.
export async function getLoggedInUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = await User.findOne({ _id: (<any>req).user.id });
  if (!user) return next(new NotFoundError());
  user.password = "";
  res.json(user);
}
