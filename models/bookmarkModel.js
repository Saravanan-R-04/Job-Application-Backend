import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    jobId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"jobs"
    }
},{timestamps:true})

export const bookmarkModel =mongoose.model("bookmarks",bookmarkSchema)