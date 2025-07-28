import mongoose from "mongoose";
const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    tags:{
        type:[String],
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
},{timestamps:true})

export const jobModel = mongoose.model("jobs",jobSchema)