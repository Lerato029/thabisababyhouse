/* ===================================Function for authenticating users====================================== */
//using jwt to verify access token
import jwt from "jsonwebtoken";
import Users from "../models/userModel";

const auth = async (req, res) => {
  //get token from headers
  const token = req.headers.authorization;

  //check if token's provided
  if (!token)
    return res
      .status(400)
      .json({ err: "You are not authorized! Try logging in." });

  //compare token with access token
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  //return error if the validation is invalid
  if (!decoded)
    return res.status(400).json({ err: "Authentication not valid!" });

  //else search users by their id
  const user = await Users.findOne({ _id: decoded.id });

  //return user's id, role and weather they are the superuser/root
  return { id: user._id, role: user.role, root: user.root };
};

//export middleware function
export default auth;
