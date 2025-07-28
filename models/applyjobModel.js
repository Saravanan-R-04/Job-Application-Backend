import mongoose from "mongoose";
const applyjobSchema = new mongoose.Schema({
    jobID:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"jobs"
    },
    applicantId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"users"
    },
    resume:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"pending"
    }
},{timestamps:true})
export const applyjobModel = new mongoose.model("AppliedJobs",applyjobSchema)