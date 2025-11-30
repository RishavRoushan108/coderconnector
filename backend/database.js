import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const connectdb=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("mongodb connected sucessfully")
    }catch(err){
        console.log("mongodb connection failed"+err.message)
    }
}

export default connectdb;