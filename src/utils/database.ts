import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB has already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: "prompted",
    });

    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error({ error });
  }
};
