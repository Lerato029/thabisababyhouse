import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import valid from "../../../utils/valid";
import bcrypt from "bcrypt";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await signUp(req, res);
      break;
  }
};

const signUp = async (req, res) => {
  try {
    const { name, email, password, c_password } = req.body;

    const errMessage = valid(name, email, password, c_password);
    if (errMessage) return res.status(400).json({ err: errMessage });

    const user = await Users.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ err: "Email already exists. Sign-in instead?" });

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new Users({
      name,
      email,
      password: passwordHash,
      c_password,
    });
    await newUser.save();
    res.json({ message: "Success! Sign up complete!" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
