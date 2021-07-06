import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import auth from "../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await updateRole(req, res);
      break;
    case "DELETE":
      await deleteUser(req, res);
      break;
  }
};

const updateRole = async (req, res) => {
  try {
    console.log("update role called");
    const result = await auth(req, res);
    if (result.role !== "admin" || !result.root)
      return res.status(400).json({ err: "You are not authorized!" });
    const { id } = req.query;
    const { role } = req.body;
    console.log(role);
    await Users.findOneAndUpdate({ _id: id }, { role });
    res.json({ msg: "Successful Update!" });
  } catch (error) {
    return res.status(500).json({ err: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin" || !result.root)
      return res.status(400).json({ err: "You are not authorized!" });
    const { id } = req.query;

    await Users.findByIdAndDelete(id);
    res.json({ msg: "User Deleted" });
  } catch (error) {
    return res.status(500).json({ err: err.message });
  }
};
