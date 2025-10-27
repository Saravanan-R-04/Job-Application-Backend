import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    name:{
        type:String,
        required:true
    },
    bio:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    education:{
        type:String,
        required:true
    },
    resume:{
        type:String,
        required:true
    },
    skills:{
        type:String,
        required:true
    },
    github:{
        type:String,
        required:true
    }
})
export const profileModel = mongoose.model("profiles",profileSchema)