import mongoose from "mongoose";

export const connectDB = async() =>{
    try{
        await mongoose.connect("mongodb://localhost:27017/JobBoardApp");
        console.log("DB Connected");
    }
    catch(error)
    {
        console.log("Error In Connecting");
    }
}