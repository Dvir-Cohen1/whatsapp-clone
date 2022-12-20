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
    if (
      !req.body.userData.username &&
      !req.body.userData.email &&
      !req.body.userData.password
    ) {
      return res.status(400).json({ error: true, message: "Bad Request" });
    }

    if (req.body.userData.password !== req.body.userData.passwordConfirm) {
      res.send({ error: true, message: "Password dont match!" }).status(400);
    }

    const isUserExist = await User.exists({
      username: req.body.userData.username,
    });

    if (isUserExist) {
      res.send({ error: true, message: "User already Exist!" }).status(400);
    } else {
      const user = await User.create({ ...req.body.userData });
      // const token = generateToken(user.id);
      // const refreshToken = generateRefreshToken(user.id);

      // user.jwt_ac_token = token;
      // user.jwt_rf_token = refreshToken;
      // user.save();

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

    console.log(isPasswordMatch);
  } catch (error) {
    next(new ServerError());
  }
}
