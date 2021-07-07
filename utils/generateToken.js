/* ========================================MODULES FOR GENERATING TOKENS================================== */
//import JWT for creating access and refresh tokens
import jwt from "jsonwebtoken";

//Creates access token expiring in 45mins
export const createAccessToken = (payload) => {
  //creating web token serializing body of request and token
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "45m",
  });
};

//Creates refresh token expiring in 7days
export const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
