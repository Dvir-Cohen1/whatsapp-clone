import { Schema, model } from "mongoose";
import { isPasswordValid } from "../validator/password.validator";
import { IUserSchema } from "../@types/auth";
const bcrypt = require("bcrypt");

const userSchema = new Schema<IUserSchema>({
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
): void {
  this.jwt_ac_token = accessToken;
  this.jwt_rf_token = refreshToken;
  this.save();
};

userSchema.methods.setAccessToken = function (accessToken: string): void {
  this.jwt_ac_token = accessToken;
  this.save();
};

userSchema.methods.deleteTokens = function (): void {
  delete this.jwt_ac_token;
  delete this.jwt_rf_token;
  this.save();
};

const User = model<IUserSchema>("User", userSchema);

export default User;
