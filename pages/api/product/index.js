/* ================================API Route for handling products POST & GET Requests===========================  */
//DB interaction and auth middleware
import connectDB from "../../../utils/connectDB";
import Products from "../../../models/productModel";
import auth from "../../../middleware/auth";

//connect...
connectDB();

//call modules based on request method
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProducts(req, res);
      break;
    case "POST":
      await createProduct(req, res);
      break;
  }
};

//===============================================================READ
const getProducts = async (req, res) => {
  try {
    //find in DB and send data to client
    const products = await Products.find();
    res.json({
      status: "success",
      result: products.length,
      products,
    });
  } catch (err) {
    //return internal server error message
    return res.status(500).json({ err: err.message });
  }
};

//===============================================================POST
const createProduct = async (req, res) => {
  try {
    //admin only can create product
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "You're not authorized!" });

    //destructuring body
    const {
      title,
      price,
      inStock,
      description,
      content,
      category,
      images,
    } = req.body;


    //all fields need to be filled in
    if (
      !title ||
      !price ||
      !inStock ||
      !description ||
      !content ||
      category === "all" ||
      images.length === 0
    )
      return res.status(400).json({ err: "Please fill out the whole form" });

    //check if product exists and return error
    const product = await Products.findOne({ title });
    if (product)
      return res.status(400).json({ err: "Product already exists!" });

    //create new product and save to DB
    const newProduct = new Products({
      title: title.toLowerCase(),
      price,
      inStock,
      description,
      content,
      category,
      images,
    });
    await newProduct.save();

    //success!
    res.json({ msg: "Product created!" });
  } catch (err) {
    //return internal server error message
    return res.status(500).json({ err: err.message });
  }
};
