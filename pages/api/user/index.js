import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import auth from "../../../middleware/auth";
import bcrypt from "bcrypt";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await uploadInfo(req, res);
      break;
    case "GET":
      await getUsers(req, res);
      break;
  }
};

export const getUsers = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(500).json({ err: "You are not authorized!" });
    //find users on database but exclude passwords
    const users = await Users.find().select("-password");
    res.json({ users });
  } catch (error) {
    return res.status(500).json({ err: err.message });
  }
};

const uploadInfo = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { name, avatar } = req.body;
    const userUpdated = await Users.findOneAndUpdate(
      { _id: result.id },
      { name, avatar }
    ).select("-password");

    res.json({
      msg: "Successful Update!",
      user: { name, avatar, email: userUpdated.email, role: userUpdated.role },
    });
  } catch (error) {
    return res.status(500).json({ err: err.message });
  }
};
