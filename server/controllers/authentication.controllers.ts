import User from "../models/user.model";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../helpers/token.middleware";
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

export const register = async (req: any, res: any, next: any) => {
  try {
    const { username, password, passwordConfirm } = req.body.userData;

    if (password !== passwordConfirm) return next(new BadRequestError("Password dont match!"));
    

    await validateRequest(registerRequestSchema, req.body.userData, next);

    const isUserExist = await User.exists({
      username: username,
    });

    if (isUserExist) return next(new BadRequestError("User already Exist!"));

    await User.create({ ...req.body.userData });

    return res
      .status(201)
      .json({ error: false, message: "User Created Successfully" });
  } catch (error: any) {
    next(new ServerError(error));
  }
};

export async function login(req: any, res: any, next: any) {
  try {
    const { username, password } = req.body.userData;
    // if (!username && !password) return next(new BadRequestError());
    await validateRequest(loginRequestSchema, req.body.userData, next);
    // await validateRequest(loginRequestSchema, { username, password }, next);

    // get the user
    const user = await User.findOne({ username: username });
    if (!user) return next(new NotFoundError('User not found'));

    // validate password
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) return next(new UnauthorizeError('Username or password incorrect'));

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    user.setJwtTokens(accessToken, refreshToken);

    res.status(200).json({
      error: false,
      message: "Logged in successfully",
      accessToken,
    });
  } catch (error: any) {
    next(new ServerError(error));
  }
}

export async function logout(req: any, res: any, next: any) {
  try {
    const accessToken = req.body.accessTokenCookie;
    const user = await User.findOne({ jwt_ac_token: accessToken });

    if (!user) return next(new NotFoundError("No Such User"));

    user.jwt_ac_token = undefined;
    user.jwt_rf_token = undefined;
    user.save();

    res.status(200).json({
      error: false,
      message: "Logged out successfully",
    });
  } catch (error: any) {
    return next(new ServerError(error.message));
  }
}
