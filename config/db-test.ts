import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer;
let connection: typeof mongoose | null = null;

export const connectTestDB = async () => {
  try {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    connection = await mongoose.connect(uri);
    console.log(`✅ Test MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error("❌ Test MongoDB connection failed:", error);
    throw error;
  }
};

export const clearTestDB = async () => {
  try {
    if (!connection) return;
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
    console.log(`🧹 Test DB cleared`);
  } catch (error) {
    console.error("❌ Failed to clear Test DB:", error);
    throw error;
  }
};

export const stopTestDB = async () => {
  try {
    if (connection) {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
    }
    if (mongoServer) {
      await mongoServer.stop();
    }
    console.log(`🛑 Test MongoDB stopped`);
  } catch (error) {
    console.error("❌ Test MongoDB can't stop:", error);
    throw error;
  }
};
