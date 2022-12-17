import jwt from "jsonwebtoken";

export function generateToken({ _id }: any) {
  return jwt.sign({ id: _id }, `${process.env.ACCESS_TOKEN_SECRET}`);
}
export function generateRefreshToken({ _id }: any) {
  return jwt.sign({ id: _id }, `${process.env.ACCESS_TOKEN_SECRET}`, {
    expiresIn: "5d",
  });
}
