/* ==========================================API Route for handling login requests===========================  */
//IMPORT STATEMENTS
//DB connection module
import connectDB from "../../../utils/connectDB";

//model 
import Users from "../../../models/userModel";

//hashing
import bcrypt from "bcrypt";

//jwt tokens
import {
  createAccessToken,
  createRefreshToken,
} from "../../../utils/generateToken";


//connect to database
connectDB();


//where login module is called
export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await login(req, res);
      break;
  }
};


const login = async (req, res) => {
  try {
    //destructuring data body
    const { email, password } = req.body;

    //check if user exists if not return error
    const user = await Users.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ err: "User doesn't exists. Sign-up instead?" });

    //using this to prevent timing attacks when comparing passwords
    const isMatch = await bcrypt.compare(password, user.password);

    //error when passwords don't match
    if (!isMatch)
      return res
        .status(400)
        .json({ err: "Incorrect password! Please try again" });

    //create tokens
    const access_token = createAccessToken({ id: user._id });
    const refresh_token = createRefreshToken({ id: user._id });

    //data sent to client
    res.json({
      message: "Success! You're logged in!",
      refresh_token,
      access_token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        root: user.root,
      },
    });

    //if server error found notify client
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
