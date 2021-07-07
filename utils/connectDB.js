/* ========================================Module for connecting to database================== */
/* import for database interaction */
import mongoose from "mongoose";

//module
const connectDB = () => {
  //avoid unnecessary connection to DB
  if (mongoose.connections[0].readyState) {
    console.log("Great! Already connected...");
    return;
  }

  //first connection...
  //passing attribute to remove deprecation warnings
  mongoose.connect(
    process.env.MONGODB_URI,
    {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      //catch error
      if (err) throw err;

      //connected!
      console.log("Success! Connected to mongoDB...");
    }
  );
};

//export module
export default connectDB;
