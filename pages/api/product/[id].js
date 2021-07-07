/* ================================API Route for handling PRODUCT DELETE, PUT & GET Requests===========================  */
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
      await getProduct(req, res);
      break;
    case "PUT":
      await updateProduct(req, res);
      break;
    case "DELETE":
      await deleteProduct(req, res);
      break;
  }
};

//===============================================================READ
const getProduct = async (req, res) => {
  try {
    const { id } = req.query;//id from query
    const product = await Products.findById(id);//find product by id

    //check if in DB
    if (!product)
      return res.status(400).json({ err: "Oops!, This product doesn't exist" });

    //send product
    res.json({ product });
  } catch (err) {
    //return internal server error message
    return res.status(500).json({ err: err.message });
  }
};

//===============================================================UPDATE
const updateProduct = async (req, res) => {
  try {
    //auth user and only allow admin to update
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "You're not authorized!" });

    //destructuring query and body properties
    const { id } = req.query;
    const { title, price, inStock, description, content, category, images } =
      req.body;

    //all fields must be filled in
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

    //update product
    await Products.findByIdAndUpdate(
      { _id: id },
      {
        title,
        price,
        inStock,
        description,
        content,
        category,
        images,
      }
    );

    //success!
    res.json({ msg: "Product updated" });
  } catch (err) {
    //return internal server error message
    return res.status(500).json({ err: err.message });
  }
};

//===============================================================DELETE
const deleteProduct = async (req, res) => {
  try {
    //auth. user and only allow admin to delete product
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "You're not authorized!" });

    //get query string
    const { id } = req.query;

    //delete by id and send msg
    await Products.findByIdAndDelete(id);
    res.json({ msg: "Product deleted!" });
  } catch {
    //return internal server error message
    return res.status(500).json({ err: err.message });
  }
};
