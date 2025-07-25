import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("mongodb connected")
  } catch (error) {
    console.error(error.message)
    process.exit(1) // when error comes stop the connection
  }
}

export default connectDB
