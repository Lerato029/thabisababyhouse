/* ==========================================API Route for handling signup requests===========================  */
//IMPORT STATEMENTS
//to connect to DB
import connectDB from "../../../utils/connectDB";

//Model
import Users from "../../../models/userModel";

//hashing
import bcrypt from "bcrypt";


//connect to DB
connectDB();

//call signUp module
export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await signUp(req, res);
      break;
  }
};

/* ==========================================================CREATE user */
const signUp = async (req, res) => {
  try {
    //destructuring payload
    const { name, email, password} = req.body;

    //check if user is already on DB and return err
    const user = await Users.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ err: "Email already exists. Login instead?" });


    //hash password and passing 10 to generate salt to be addded to hashed password
    const passwordHash = await bcrypt.hash(password, 10);

    
    const newUser = new Users({
      name,
      email,
      password: passwordHash,
    });

    //save to DB and send message to client
    await newUser.save();
    res.json({ msg: "Success! Sign up complete!" });

    //catch server err 
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
