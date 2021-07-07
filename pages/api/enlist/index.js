/* ================================API Route for handling ENLIST APPLICATION POST & GET Requests===========================  */
//DB interaction and auth middleware
import connectDB from "../../../utils/connectDB";
import Aps from "../../../models/enlistModel";
import auth from "../../../middleware/auth";


//connect to DB
connectDB();


//call modules based on request method
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

//===============================================================READ
const getApplications = async (req, res) => {
  try {
    //authenticate user
    const result = await auth(req, res);
    
    //declare variable - assigned value based on condition
    let ap;
    if (result.role !== "admin") {
      //finding applications by user id
      //also finding user in the user collection but exclude password
      ap = await Aps.find({ user: result.id }).populate("user", "-password");
    } else {
      //if admin all retrieve applications + user data but exclude password
      ap = await Aps.find().populate("user", "-password");
    }

    res.json({ ap });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

//===============================================================POST
const createApplication = async (req, res) => {
  try {
    //get user details from auth middleware
    const result = await auth(req, res);
    //destructuring body
    const { fullName, email, mobile, role } = req.body;

    //check if user has already made application and return error
    const exists = await Aps.find({ user: result.id });
    if (exists.length !== 0)
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
