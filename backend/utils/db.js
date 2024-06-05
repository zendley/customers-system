import mongoose from "mongoose";
import  dotenv from "dotenv"
dotenv.config()

const dbCon = async () => 
{

    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("Database Connected")
    } catch (error) {
        console.log("Error",error)
    }
}

export default dbCon