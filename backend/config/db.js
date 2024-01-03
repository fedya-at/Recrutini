import mongoose from "mongoose";
import { config } from "dotenv";
import colors from "colors";

config();

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to the database".cyan);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`.red);
    process.exit(1);
  }
};

export default connectToDatabase;
