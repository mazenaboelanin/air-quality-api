import mongoose from "mongoose";
let connect: any;

export const connectDB = async () => {
  try {
    connect = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`✅ MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    // process.exit(1); // stop the app if DB connection fails
  }
};

export const stopDB = async () => {
  try {
    await connect.connection.close();
    console.log(`✅ MongoDB STOPPED: ${connect.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Can't STOP", error);
    // process.exit(1); // stop the app if DB connection fails
  }
};
