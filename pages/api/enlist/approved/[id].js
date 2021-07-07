/* ================================API Route for handling ENLIST APPLICATION PATCH Requests===========================  */
//DB interaction
import connectDB from "../../../../utils/connectDB";
import Aps from "../../../../models/enlistModel";

//auth middleware
import auth from "../../../../middleware/auth";


//connect...
connectDB();


//calling module
export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await approvedAp(req, res);
      break;
  }
};

//async function to Update Enlist Application to approved
const approvedAp = async (req, res) => {
  try {

    //authenticate user
    const result = await auth(req, res);

    //return error if not admin
    if (result.role !== "admin")
      return res.status(400).json({ err: "You are not authorized" });

    //get query for database interaction from URL
    const { id } = req.query;

    //update to approved  send msg and status
    await Aps.findOneAndUpdate(
      { _id: id },
      {
        approved: true,
      }
    );

    //send msg and update to client
    res.json({
      msg: "Application updated to approved",
      result: {
        approved: true,
      },
    });
  } catch (err) {
    //server err
    return res.status(500).json({ err: err.message });
  }
};
