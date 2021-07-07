/* ================================API Route for handling a category's PUT & DELETE Requests===========================  */
//DB interaction
import connectDB from "../../../utils/connectDB";
import Categories from "../../../models/categoriesModel";

//auth middleware
import auth from "../../../middleware/auth";


//connect...
connectDB();

//call modules based on request method
export default async (req, res) => {
  switch (req.method) {
    case "PUT":
      await updateCategory(req, res);
      break;
    case "DELETE":
      await deleteCategory(req, res);
      break;
  }
};

//===============================================================UPDATE
const updateCategory = async (req, res) => {
  try {
    //call middleware function to authenticate user
    const result = await auth(req, res);

    //if not admin return error
    if (result.role !== "admin")
      return res.status(400).json({ err: "You're are not Authorized!" });

    //destructuring req body and query properties
    const { id } = req.query;
    const { name } = req.body;

    //update category name
    const newCategory = await Categories.findOneAndUpdate(
      { _id: id },
      { name }
    );

    //response sent to client
    res.json({
      msg: "Category Updated",
      category: { ...newCategory._doc, name },
    });
  } catch (err) {
    //server error
    return res.status(500).json({ err: err.message });
  }
};


//===============================================================DELETE
const deleteCategory = async (req, res) => {
  try {
    //call middleware function to authenticate user and return error if not admin
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "You're are not Authorized!" });

    //get id from query
    const { id } = req.query;

    //delete from DB and success msg to client
    await Categories.findByIdAndDelete(id);
    res.json({ msg: "Category Deleted" });
  } catch (err) {
    //internal server error message
    return res.status(500).json({ err: err.message });
  }
};
