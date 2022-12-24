import jwt from "jsonwebtoken";

 function generateAccessToken({ _id }: any) {
  try {
    return jwt.sign({ id: _id }, String(process.env.ACCESS_TOKEN_SECRET), {
      expiresIn: new Date(86400).getTime(),
    });
  } catch (error) {
    throw error;
  }
}
 function generateRefreshToken({ _id }: any) {
  try {
    return jwt.sign({ id: _id }, String(process.env.ACCESS_TOKEN_SECRET), {
      expiresIn: "5d",
    });
  } catch (error) {
    throw error;
  }
}

 function verifyAccessToken(token: string) {
  try {
    return jwt.verify(token, String(process.env.ACCESS_TOKEN_SECRET));
  } catch (error) {
    throw error;
  }
}
 export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken
 }