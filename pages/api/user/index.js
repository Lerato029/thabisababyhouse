/* ================================API Route for handling ENLIST APPLICATION POST & GET Requests===========================  */
//DB interaction and auth middleware
import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import auth from "../../../middleware/auth";



//connect
connectDB();


//call modules
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

//===============================================================GET
export const getUsers = async (req, res) => {
  try {
    //ONLY ADMIN ALLOWED TO GET USERS
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

//===============================================================PATCH
const uploadInfo = async (req, res) => {
  try {
    //call middleware and get id
    const result = await auth(req, res);

    //destructuring body
    const { name, avatar } = req.body;

    //find users on database but exclude passwords
    const userUpdated = await Users.findOneAndUpdate(
      { _id: result.id },
      { name, avatar }
    ).select("-password");

    //send updated user data to client
    res.json({
      msg: "Successful Update!",
      user: { name, avatar, email: userUpdated.email, role: userUpdated.role },
    });
  } catch (error) {
    return res.status(500).json({ err: err.message });
  }
};
