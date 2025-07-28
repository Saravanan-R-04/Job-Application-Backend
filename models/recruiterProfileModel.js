import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    },
    Name:{
        type:String,
        required:true
    },
    Bio:{
        type:String,
        required:true
    },
    CompanyName:{
        type:String,
        required:true
    },
    Designation:{
        type:String,
        required:true
    },
    Location:{
        type:String,
        required:true
    }
})
export const recruiterProfileModel = mongoose.model("recruiterProfiles",profileSchema)