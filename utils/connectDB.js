import mongoose from "mongoose";

const connectDB = () => {
  if (mongoose.connections[0].readyState) {
    console.log("Great! Already connected...");
    return;
  }
  mongoose.connect(
    process.env.MONGODB_URI,
    {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) throw err;
      console.log("Success! Connected to mongoDB...");
    }
  );
};

export default connectDB;
