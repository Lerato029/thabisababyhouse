/* ================================API Route for handling ORDER DELIVER PATCH Requests===========================  */
//DB interaction and auth middleware
import connectDB from "../../../../utils/connectDB";
import Orders from "../../../../models/orderModel";
import auth from "../../../../middleware/auth";

//connect
connectDB();

//call modules based on request method
export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await deliveredOrder(req, res);
      break;
  }
};

//async function to Update order to delivered
const deliveredOrder = async (req, res) => {
  try {
    //authentication: check if user is admin
    const result = await auth(req, res);
    //return error if not admin
    if (result.role !== "admin")
      return res.status(400).json({ err: "Invalid, Not Authorized" });

    //get query for database interaction from URL
    const { id } = req.query;

    //find order using the id
    const order = await Orders.findOne({ _id: id });

    //update to delivered for paid orders
    if (order.paid) {
      await Orders.findOneAndUpdate(
        { _id: id },
        {
          delivered: true,
        }
      );
      res.json({
        msg: "Order updated to delivered",
        result: {
          paid: true,
          dateOfPayment: order.dateOfPayment,
          method: order.method,
          delivered: true,
        },
      });
    } else {
      
      //update to delivered for cash payments
      await Orders.findOneAndUpdate(
        { _id: id },
        {
          paid: true,
          dateOfPayment: new Date().toISOString(),
          method: "Cash",
          delivered: true,
        }
      );
      res.json({
        msg: "Order updated to delivered",
        result: {
          paid: true,
          dateOfPayment: new Date().toISOString(),
          method: "Cash",
          delivered: true,
        },
      });
    }
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
