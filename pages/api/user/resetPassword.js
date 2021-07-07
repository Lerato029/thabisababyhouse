/* ================================API Route for handling ENLIST APPLICATION POST & GET Requests===========================  */
//DB interaction, bcrypt for hashing and auth middleware 
import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import auth from "../../../middleware/auth";
import bcrypt from "bcrypt";

//connect
connectDB();


//call module based on request method
export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await resetPassword(req, res);
      break;
  }
};

const resetPassword = async (req, res) => {
  try {
    //get query used in findOneAndUpdate method
    const result = await auth(req, res);

    //destructuring body
    const { password } = req.body;

    //hash password and passing 10 to generate salt to be addded to hashed password
    const passwordHash = await bcrypt.hash(password, 10);

    //update password
    await Users.findOneAndUpdate(
      { _id: result.id },
      { password: passwordHash }
    );

    res.json({ msg: "Successful Update!" });//success!
    //catch server error
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
