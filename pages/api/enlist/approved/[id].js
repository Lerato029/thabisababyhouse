import connectDB from "../../../../utils/connectDB";
import Aps from "../../../../models/enlistModel";
import auth from "../../../../middleware/auth";

connectDB();

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

    //authentication: check if user is admin
    const result = await auth(req, res);

    //return error if not admin
    if (result.role !== "admin")
      return res.status(400).json({ err: "You are not authorized" });

    //get query for database interaction from URL
    const { id } = req.query;

    //update to approved 
    await Aps.findOneAndUpdate(
      { _id: id },
      {
        approved: true,
      }
    );
    res.json({
      msg: "Application updated to approved",
      result: {
        approved: true,
      },
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
