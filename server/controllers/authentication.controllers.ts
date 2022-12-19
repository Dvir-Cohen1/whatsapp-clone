import User from "../models/user.model";
import {
  generateToken,
  generateRefreshToken,
} from "../helpers/token.middleware";

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
      res.send({ error: true, message: 'Password dont match!' }).status(400);
    }

    const isUserExist = await User.exists({
      username: req.body.userData.username,
    });

    if (isUserExist) {
      res.send({ error: true, message: 'User already Exist!' }).status(400);
    } else {
      const user = await User.create({ ...req.body.userData });

      const token = generateToken(user.id);
      const refreshToken = generateRefreshToken(user.id);

      user.jwt_ac_token = token;
      user.jwt_rf_token = refreshToken;
      user.save();

      res.status(201).json({
        error: false,
        message: "User Created Successfully",
        token,
      });
    }
  } catch (error) {
    return
    // res.send({ error: true, message: 'User already Exist!' }).status(400);
    // res.status(400).json({ error: true, message: error });
  }
};
