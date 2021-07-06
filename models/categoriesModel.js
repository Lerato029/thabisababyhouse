/*==========================================Categories model for products model============================ */
//require mongoose to be able to create model
import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

//store model in Dataset variable then export it
let Dataset =
  mongoose.models.categories || mongoose.model("categories", CategorySchema);
export default Dataset;
