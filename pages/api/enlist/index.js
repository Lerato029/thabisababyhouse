import connectDB from "../../../utils/connectDB";
import Aps from "../../../models/enlistModel";
import auth from "../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await createApplication(req, res);
      break;
    case "GET":
      await getApplications(req, res);
      break;
  }
};

const getApplications = async (req, res) => {
  try {
    const result = await auth(req, res);
    let ap;
    if (result.role !== "admin") {
      //finding applications by user id
      //also finding user in the user collection but exclude password
      ap = await Aps.find({ user: result.id }).populate("user", "-password");
    } else {
      //if admin all retrieve applications + user data
      ap = await Aps.find().populate("user", "-password");
    }

    res.json({ ap });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const createApplication = async (req, res) => {
  try {
    //get user details from auth middleware
    const result = await auth(req, res);
    const { fullName, email, mobile, role } = req.body;
    const exists = await Aps.find({ user: result.id });
    if (exists)
      return res.status(400).json({ err: "You can only make one application" });
    //creating new application
    const newAp = new Aps({
      user: result.id,
      fullName,
      email,
      mobile,
      role,
    });

    //using the save method to add new ap. to database
    await newAp.save();

    //sending message to the client
    res.json({
      msg: "The application was successful thank you! we will email you to confirm the application",
      newAp,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
