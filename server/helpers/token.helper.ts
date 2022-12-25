import jwt from "jsonwebtoken";

function generateAccessToken({ _id }: any) {
  try {
    return jwt.sign({ id: _id }, String(process.env.ACCESS_TOKEN_SECRET), {
      expiresIn: new Date(60).getTime(),
    });
  } catch (error) {
    throw error;
  }
}

function generateRefreshToken({ _id }: any) {
  try {
    return jwt.sign({ _id: _id }, String(process.env.ACCESS_TOKEN_SECRET));
  } catch (error) {
    throw error;
  }
}
/**
 * @returns decoded object if pass verification
 * @param  {string} accessToken
 */
function verifyAccessToken(accessToken: string) {
  try {
    return jwt.verify(accessToken, String(process.env.ACCESS_TOKEN_SECRET));
    // return decoded
  } catch (error) {
    throw error;
  }
}
export { generateAccessToken, generateRefreshToken, verifyAccessToken };
