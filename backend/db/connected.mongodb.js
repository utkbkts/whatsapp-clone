import mongoose from "mongoose";

export const ConnectedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected is mongodb success");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};
