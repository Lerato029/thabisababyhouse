import connectDB from "../../../utils/connectDB";
import Products from "../../../models/productModel";
import auth from "../../../middleware/auth";

connectDB();

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

const getProducts = async (req, res) => {
  try {
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

const createProduct = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "You're not authorized!" });

    const {
      title,
      price,
      inStock,
      description,
      content,
      category,
      images,
    } = req.body;

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

    //check if product exists
    const product = await Products.findOne({ title });
    console.log(product);
    if (product)
      return res.status(400).json({ err: "Product already exists!" });

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

    res.json({ msg: "Product created!" });
  } catch (err) {
    //return internal server error message
    return res.status(500).json({ err: err.message });
  }
};
