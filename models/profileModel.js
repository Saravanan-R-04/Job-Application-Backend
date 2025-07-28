import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    bio:{
        type:String,
        required:true
    },
    skills:{
        type:[String],
        required:true
    },
    experience:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    resumeURL:{
        type:String,
        required:true
    },
    education:{
        type:String,
        required:true
    },
    linkedURL:{
        type:String,
        required:true
    },
    githubURL:{
        type:String,
        required:true
    }
})
export const profileModel = mongoose.model("profiles",profileSchema)