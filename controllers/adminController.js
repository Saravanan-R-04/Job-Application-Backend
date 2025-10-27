import { userModel } from "../models/userModel.js"
import { jobModel } from "../models/jobModel.js"
import { applyjobModel } from "../models/applyjobModel.js";
import { profileModel } from "../models/profileModel.js";
import { recruiterProfileModel } from "../models/recruiterProfileModel.js";

export const allCandidateController = async(req,res) =>{
    try{
        const allCandidates = await userModel.find({role:"Candidate"});
        if(!allCandidates)
        {
            return res.status(400).json({
                success:false,
                message:"No Candidates Available"
            })
        } 
        return res.status(200).json({
            success:true,
            message:"All Candidates",
            allCandidates
        })
    }   
    catch(error)
    {
        console.log(error);
    }
}

export const allRecruiterController = async(req,res) =>{
    try{
        const allRecruiters = await userModel.find({role:"Recruiter"});
        if(!allRecruiters)
        {
            return res.status(400).json({
                success:false,
                message:"No Recruiter Available"
            })
        } 
        return res.status(200).json({
            success:true,
            message:"All Recruiters",
            allRecruiters
        })
    }   
    catch(error)
    {
        console.log(error);
    }
}

export const allJobsController = async(req,res) =>{
    try{
        const allJobs = await jobModel.find().populate({
            path:"createdBy",
            select:"name email"
        }
        );
        if(!allJobs)
        {
            return res.status(400).json({
                success:false,
                message:"No Jobs Are Posted"
            })
        }
        return res.status(200).json({
            success:true,
            message:"All Jobs",
            allJobs
        })
    }
    catch(error)
    {
        console.log(error);
    }
}
export const appliedJobsCountController = async(req,res) =>{
    try{
        const allJobs = await applyjobModel.find();
        return res.status(200).json({
            success:true,
            allJobs
        })
    }
    catch(error)
    {
        console.log(error);
    }
}
export const deleteCandidateController = async (req,res) =>{
    try{
        const candidateId = req.params.id;
        const candidate = await userModel.findById(candidateId);
        if(!candidate)
        {
            return res.status(400).json({
                success:false,
                message:"Candidate Not Exists"
            })
        }
        await userModel.findByIdAndDelete(candidateId)
        return res.status(200).json({
            success:true,
            message:"Candidate Deleted Successfully"
        })
    }
    catch(error)
    {
        console.log(error);
    }
}

export const deleteRecruiterController = async (req,res) =>{
     try{
        const recruiterId = req.params.id;
        const recruiter = await userModel.findById(recruiterId);
        if(!recruiter)
        {
            return res.status(400).json({
                success:false,
                message:"Recruiter Not Exists"
            })
        }
        await userModel.findByIdAndDelete(recruiterId)
        return res.status(200).json({
            success:true,
            message:"Recruiter Deleted Successfully"
        })
    }
    catch(error)
    {
        console.log(error);
    }

}

export const deleteJobController = async (req,res) =>{
    try{
        const jobId = req.params.id;
        const job = await jobModel.findById(jobId);
        if(!job)
        {
            return res.status(400).json({
                success:false,
                message:"Job Not Exists"
            })
        }
        await jobModel.findByIdAndDelete(jobId)
        return res.status(200).json({
            success:true,
            message:"Job Deleted Successfully"
        })
    }
    catch(error)
    {
        console.log(error);
    }
}
export const viewCandidateProfiles = async (req,res) =>{
    try{
        const allCandidateProfiles = await profileModel.find();
        if(!allCandidateProfiles)
        {
            return res.status(400).json({
                success:false,
                message:"No Profile Found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Profiles Fetched",
            allCandidateProfiles
        })
    }
    catch(error)
    {
        console.log(error);
    }
}
export const viewRecruiterProfiles = async (req,res) =>{
    try{
        const allRecruiterProfiles = await recruiterProfileModel.find();
        if(!allRecruiterProfiles)
        {
            return res.status(400).json({
                success:false,
                message:"No Profile Found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Profiles Fetched",
            allRecruiterProfiles
        })
    }
    catch(error)
    {
        console.log(error);
    }
}
export const viewApplicationsController = async (req,res) =>{
    try{
        const allJobs = await applyjobModel.find().populate({
            path:"jobID",
            select:"title description location salary"
        }).populate({
            path:"applicantId",
            select:"name email"
        });
        if(!allJobs)
        {
            return res.status(400).json({
                success:false,
                message:"No Jobs Applied"
            })
        }
        return res.status(200).json({
            success:true,
            message:"All Job Applications",
            allJobs
        })
    }
    catch(error)
    {
        console.log(error);
    }
}
export const pendingJobCount = async(req,res) =>{
    try{
        const pendingJobs = await applyjobModel.find({status:"pending"});
        return res.status(200).json({
            success:true,
            pendingJobs
        })
    }
    catch(error)
    {
        console.log(error);
    }
}
export const rejectedJobCount = async(req,res) =>{
        try{
        const rejectedJobs = await applyjobModel.find({status:"rejected"});
        return res.status(200).json({
            success:true,
            rejectedJobs
        })
    }
    catch(error)
    {
        console.log(error);
    }
}
export const acceptedJobCount = async(req,res) =>{
       try{
        const acceptedJobs = await applyjobModel.find({status:"accepted"});
        return res.status(200).json({
            success:true,
            acceptedJobs
        })
    }
    catch(error)
    {
        console.log(error);
    }
}