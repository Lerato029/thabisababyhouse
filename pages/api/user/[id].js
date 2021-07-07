/* ================================API Route for USER PATCH & DELETE Requests===========================  */
//DB interaction and auth middleware
import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import auth from "../../../middleware/auth";


//connect...
connectDB();


//call modules based on request method
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

//===============================================================PATCH
const updateRole = async (req, res) => {
  try {
    //only allow root account user to update
    const result = await auth(req, res);
    if (result.role !== "admin" || !result.root)
      return res.status(400).json({ err: "You are not authorized!" });

    //destructuring query and body
    const { id } = req.query;
    const { role } = req.body;
 
    //update on DB and send success message
    await Users.findOneAndUpdate({ _id: id }, { role });
    res.json({ msg: "Successful Update!" });
  } catch (error) {
    return res.status(500).json({ err: err.message });
  }
};

//===============================================================DELETE
const deleteUser = async (req, res) => {
  try {
    //only root acc can delete users
    const result = await auth(req, res);
    if (result.role !== "admin" || !result.root)
      return res.status(400).json({ err: "You are not authorized!" });
    const { id } = req.query;

    //delete user from DB and send msg
    await Users.findByIdAndDelete(id);
    res.json({ msg: "User Deleted" });
  } catch (error) {
    return res.status(500).json({ err: err.message });
  }
};
