/* ================================API Route for handling categories GET & POST Requests===========================  */
//DB interaction
import connectDB from "../../../utils/connectDB";
import Categories from "../../../models/categoriesModel";

//auth middleware
import auth from "../../../middleware/auth";


//connect to DB
connectDB();

//call modules based on request method
export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await createCategory(req, res);
      break;
    case "GET":
      await getCategories(req, res);
      break;
  }
};

//===============================================================CREATE
const createCategory = async (req, res) => {
  try {
    //call middleware function to authenticate user and return error if not admin
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "You're are not Authorized!" });

    //user has to provide category name
    const { name } = req.body;
    if (!name) return res.status(400).json({ err: "Please enter a name" });

    /* save category to DB */
    const newCategory = new Categories({ name });
    await newCategory.save();

    //pass category and msg to client
    res.json({ msg: "Category created!", newCategory });
  } catch (err) {
    //server err
    return res.status(500).json({ err: err.message });
  }
};

//==============================================================READ
const getCategories = async (req, res) => {
  try {
    //get categories from DB
    const categories = await Categories.find();
    res.json({ categories });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
