import mongoose from "mongoose";
import dns from "dns"

//dns for connection error fix
dns.setServers([
    "0.0.0.0",
    "8.8.8.8"
])

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected !!");
  } catch (error) {
    console.log("MongoDB Error:", error.message);
  }
};

export default connectDB;