import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    await mongoose.connect("mongodb+srv://philiprajnb_db_user:ds5IO9wHiw0vnIiF@igloo-ims.zs1waxh.mongodb.net/?appName=Igloo-IMS");

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed");
    console.error(error);
    process.exit(1);
  }
};