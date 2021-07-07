/*=====================================================Order Model============================ */
//require mongoose to be able to create model
import mongoose from "mongoose";


//referencing user for each order placed 
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    address: String,
    mobile: String,
    cart: Array,
    total: Number,
    paymentId: String,
    method: String,
    delivered: {
      type: Boolean,
      default: false,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    dateOfPayment: Date,
  },
  {
    timestamps: true,
  }
);

//export and export model/collection in database
let Dataset = mongoose.models.order || mongoose.model("order", orderSchema);
export default Dataset;
