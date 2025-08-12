// Load environment variables from .env file
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "config.env"),
});