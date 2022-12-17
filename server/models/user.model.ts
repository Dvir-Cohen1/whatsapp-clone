import { Schema, model } from "mongoose";
import { isPasswordValid } from "../validator/password.validator";
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: { type: String, require: true, unique: true },
  email: { type: String, require: true, unique: true },
  password: {
    type: String,
    require: true,
    //     validate: {
    //       validator: isPasswordValid,
    //       message: "Please Provide valid password.",
    //     },
  },
  jwt_ac_token: { type: String },
  jwt_rf_token: { type: String },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

type Password = {
  password: String;
};

userSchema.methods.isPasswordCorrect = async function (userPassword: Password) {
  return await bcrypt.compare(userPassword, this.password);
};

const User = model("User", userSchema);

export default User;
