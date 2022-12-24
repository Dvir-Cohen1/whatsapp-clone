import { Schema, model } from "mongoose";
import { isPasswordValid } from "../validator/password.validator";
import { IUser } from "../@types/auth";
const bcrypt = require("bcrypt");

const userSchema = new Schema<IUser>({
  username: { type: String, require: true, unique: true },
  email: { type: String, require: true, unique: true },
  password: {
    type: String,
    require: true,
    // validate: {
    //   validator: isPasswordValid,
    //   message: "Please Provide valid password.",
    // },
  },
  jwt_ac_token: { type: String },
  jwt_rf_token: { type: String },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (plainPassword: string) {
  const isMatch = await bcrypt.compare(plainPassword, this.password);
  return isMatch;
};

userSchema.methods.setJwtTokens = function (
  accessToken: string,
  refreshToken: string
) {
  this.jwt_ac_token = accessToken;
  this.jwt_rf_token = refreshToken;
  this.save();
};

userSchema.methods.setAccessToken = function (accessToken: string) {
  this.jwt_ac_token = accessToken;
  this.save();
};

userSchema.methods.isUserAlreadyExist = function (username: string) {
  const user = User.exists({
    username: username,
  });
};

const User = model<IUser>("User", userSchema);

export default User;
