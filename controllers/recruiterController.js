import { applyjobModel } from "../models/applyjobModel.js";
import { jobModel } from "../models/jobModel.js";
import { profileModel } from "../models/profileModel.js";
import { recruiterProfileModel } from "../models/recruiterProfileModel.js";

export const createProfileController = async(req,res) =>{
    try{
        const{Name,Bio,CompanyName,Designation,Location}=req.body;
        if(!Name || !Bio || !CompanyName || !Designation || !Location)
        {
            return res.status(400).json({
                success:false,
                message:"All Fields Are Required"
            })
        }
        const existingProfile = await recruiterProfileModel.findOne({ userId: req.user.id });
        if (existingProfile) {
        return res.status(400).json({
            success: false,
            message: "Profile already exists. Please update instead.",
        });
        }
        const profile = new recruiterProfileModel({
            userId:req.user.id,
            Name,
            Bio,
            CompanyName,
            Designation,
            Location
        })
        await profile.save();
        return res.status(200).json({
            success:true,
            message:"Profile Created Successfully",
            profile
        })
    }
    catch(error)
    {
        console.log(error.message);
    }

}

export const updateProfileController = async(req,res) =>
{
    try
    {
        const profileId = req.params.id.trim();
        const profileExists = await recruiterProfileModel.findById(profileId)
        if(!profileExists)
        {
            return res.status(400).json({
                success:false,
                message:"You need to create profile"
            })
        }
        profileExists.Name=req.body.Name;
        profileExists.Bio=req.body.Bio;
        profileExists.CompanyName=req.body.CompanyName;
        profileExists.Designation=req.body.Designation;
        profileExists.Location=req.body.Location;

        await profileExists.save();
        return res.status(200).json({
            success:true,
            message:"Profile Updated Successfully",
            profileExists
        })
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Error In Creating Profile"
        })
    }

}

export const createJobController = async(req,res) =>{
    try{
        const{title,description,salary,location,tags}=req.body;
        if(!title || !description || !salary || !location || !tags)
        {
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        const existingJob = await jobModel.findOne({title})
        if(existingJob)
        {
            return res.status(400).json({
                success:false,
                message:"Job Already Posted"
            })
        }
        const newJob = new jobModel({
            title,
            description,
            salary,
            location,
            tags,
            createdBy:req.user.id
        })
        await newJob.save();
        return res.status(200).json({
            success:false,
            message:"Job Posted Successfully"
        })
    }
    catch(error)
    {
        console.log(error.message);
    }
}

export const updateJobController = async(req,res) =>{
    try{
        const jobId = req.params.id;
        const existJob = await jobModel.findById(jobId)
        if(!existJob)
        {
            return res.status(400).json({
                success:false,
                message:"No Job is posted"
            })
        }
        existJob.title=req.body.title || existJob.title;
        existJob.description=req.body.description || existJob.description
        existJob.salary=req.body.salary || existJob.salary
        existJob.location=req.body.location || existJob.location
        existJob.tags=req.body.tags || existJob.tags
        await existJob.save();
        return res.status(200).json({
            success:true,
            message:"Job Updated Successfully"
        })
    }
    catch(error)
    {
        console.log(error.message);
    }

}

export const deleteJobController = async(req,res) =>{
    try{
        const jobId = req.params.id;
        const existJob = await jobModel.findById(jobId)
        if(!existJob)
        {
            return res.status(400).json({
                success:false,
                message:"Job Not Exists"
            })
        }
        await jobModel.findByIdAndDelete(jobId)
        return res.status(200).json({
            success:false,
            message:"Job Deleted Successfully"
        })
    }
    catch(error)
    {
        console.log(error)
    }
}

export const getAllJobsController = async(req,res) =>{
    try{
        const allJobs = await jobModel.find();
        if(!allJobs)
        {
            return res.status(400).json({
                success:false,
                message:"No Jobs are posted"
            })
        }
        return res.status(200).json({
            success:false,
            message:"All Jobs",
            allJobs
        })
    }
    catch(error)
    {
        console.log(error);
    }

}

export const jobApplicantController = async (req, res) => {
  try {
   
    const recruiterId = req.user.id;

    
    const jobs = await jobModel.find({ createdBy: recruiterId });

    const jobIds = jobs.map((job) => job.id);

    const applications = await applyjobModel
      .find({ jobID: { $in: jobIds } })
      .populate("jobID", "title location") 
      .populate("applicantId", "name email"); 

   
    res.status(200).json({
      success: true,
      totalApplications: applications.length,
      data: applications,
    });
  } catch (error) {
    console.error("Error in jobApplicantController:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const jobApplicantProfileController =async(req,res) =>{
    try{
        const Id=req.params.id;
        const profile = await profileModel.findOne({userId:Id})
        return res.status(200).json({
            success:true,
            message:"Job Applicant Profile",
            profile
        })
    }
    catch(error)
    {
        console.log(error);
    }
}

export const markJobController = async(req,res) =>{
    try{
        const Id=req.params.id;
        const job=await applyjobModel.findById(Id).populate({
            path:"jobID",
            select:"title description salary location"
        }).populate({
            path:"applicantId",
            select:"name email"
        });
        if(!job)
        {
            return res.status(400).json({
                success:false,
                message:"Invalid Job"
            })
        }
        job.status="accepted";
        return res.status(200).json({
            success:false,
            message:"Job Marked Successfully",
            job
        })
    }
    catch(error){
        console.log(error);
    }
}