import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.DB_URI);

    const url = `${db.connection.host}${db.connection.port}`
    console.log(`MongoDB conectada en: ${url}`)
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

export default connectDB