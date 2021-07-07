/* ================================API Route for handling ORDER POST & GET Requests===========================  */
//DB interaction and auth middleware
import connectDB from "../../../utils/connectDB";
import Orders from "../../../models/orderModel";
import Products from "../../../models/productModel";
import auth from "../../../middleware/auth";

//connecting...
connectDB();

//call modules based on request method
export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await createOrder(req, res);
      break;
    case "GET":
      await getOrders(req, res);
      break;
  }
};

const getOrders = async (req, res) => {
  try {
    //auth. user
    const result = await auth(req, res);

    //declare variable - assigned value based on condition
    let orders;

    if (result.role !== "admin") {
      //finding applications by user id if not admin
      //also finding user in the user collection but exclude password
      orders = await Orders.find({ user: result.id }).populate(
        "user",
        "-password"
      );
    } else {
      //if admin all retrieve orders + user data but exclude passwords
      orders = await Orders.find().populate("user", "-password");
    }

    //send orders to client
    res.json({ orders });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const createOrder = async (req, res) => {
  try {
    //get user details from auth middleware
    const result = await auth(req, res);
    //destructuring body
    const { address, mobile, cart, total } = req.body;

    //creating new order 
    const newOrder = new Orders({
      user: result.id,
      address,
      mobile,
      cart,
      total,
    });
 
    //calling the sold function for each item in the array
    cart.filter((item) => {
      return sold(item._id, item.quantity, item.inStock, item.sold);
    });

    //save to DB
    await newOrder.save();

    //send new order to client and msg
    res.json({
      msg: "The order was successful thank you! we will contact you soon to confirm the order",
      newOrder,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};


//called in createOrder module
const sold = async (id, quantity, oldInStock, oldSold) => {
  //update quantities and sold properties for a product
  await Products.findOneAndUpdate(
    { _id: id },
    {
      inStock: oldInStock - quantity,
      sold: quantity + oldSold,
    }
  );
};
