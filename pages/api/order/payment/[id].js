/* ================================API Route for handling ORDER PAYMENT PATCH Requests===========================  */
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
      await paymentOrder(req, res);
      break;
  }
};

const paymentOrder = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role === "user") {
      //destructuring query and body objects
      const { id } = req.query;
      const { paymentId } = req.body;

      //update by id order when paypal payment made
      await Orders.findOneAndUpdate(
        { _id: id },
        {
          paid: true,
          dateOfPayment: new Date().toISOString(),
          paymentId,
          method: "Paypal",
        }
      );

      //response to client
      res.json({ msg: "Great! payment was successfully made" });
    }
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
