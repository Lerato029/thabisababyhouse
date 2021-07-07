/* ==========================================API Route for handling refresh tokens===========================  */
//IMPORT STATEMENTS
import connectDB from "../../../utils/connectDB";//DB connection module

//model 
import Users from "../../../models/userModel";

//authentication
import jwt from "jsonwebtoken";

//module for creating access token
import { createAccessToken } from "../../../utils/generateToken";

//connect...
connectDB();

export default async (req, res) => {
  try {
    //get refresh token 
    const rf_token = req.cookies.refreshtoken;

    //no token stored in cookies then return error
    if (!rf_token) return res.status(400).json({ err: "Please log in" });

    //else verify token 
    const result = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET);

    //return error if token isn't valid
    if (!result)
      return res.status(400).json({ err: "Token is incorrect or expired" });

    //find user from DB, if not found then return error
    const user = await Users.findById(result.id);
    if (!user)
      return res.status(400).json({ err: "Oops! User does not exist" });

    //generating access token
    const access_token = createAccessToken({ id: user._id });

    //response sent to client
    res.json({
      access_token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        root: user.root,
      },
    });
  } catch (err) {
    //server err
    return res.status(500).json({ err: err.message});
  }
};
