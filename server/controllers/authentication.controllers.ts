import User from "../models/user.model";
import {
  generateToken,
  generateRefreshToken,
} from "../helpers/token.middleware";
import {
  ServerError,
  BadRequestError,
  NotFoundError,
  UnauthorizeError,
} from "../errors/Error";

export const register = async (req: any, res: any, next: any) => {
  try {
    const { username, email, password, passwordConfirm } = req.body.userData;

    if (!username && !email && !password) {
      return res.status(400).json({ error: true, message: "Bad Request" });
    }

    if (password !== passwordConfirm) {
      res.send({ error: true, message: "Password dont match!" }).status(400);
    }

    const isUserExist = await User.exists({
      username: username,
    });

    if (isUserExist) {
      res.send({ error: true, message: "User already Exist!" }).status(400);
    } else {
      await User.create({ ...req.body.userData });
      res.status(201).json({
        error: false,
        message: "User Created Successfully",
        // token,
      });
    }
  } catch (error) {
    next(new ServerError());
  }
};

export async function login(req: any, res: any, next: any) {
  try {
    const { username, password } = req.body.userData;
    if (!username && !password) return next(new BadRequestError());

    // get the user
    const user = await User.findOne({ username: username });
    if (!user) return next(new NotFoundError());
    // validate password
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) next(new UnauthorizeError());

    const token = generateToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    user.jwt_ac_token = token;
    user.jwt_rf_token = refreshToken;
    user.save();

    res.status(200).json({
      error: false,
      message: "Logged in successfully",
      token,
    });

  } catch (error) {
    next(new ServerError());
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
