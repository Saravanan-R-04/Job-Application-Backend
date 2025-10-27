import { profileModel } from '../models/profileModel.js'
import { jobModel } from '../models/jobModel.js';
import { applyjobModel } from '../models/applyjobModel.js';
import { bookmarkModel } from '../models/bookmarkModel.js';
export const createProfileController = async(req,res) =>{
    try{
       
        const{name,bio,experience,location,education,resume,skills,github}=req.body;
        if(!name || !bio || !experience || !location || !education || !resume || !skills || !github)
        {
            return res.status(400).json({
                success:false,
                message:"All Fields Are Required"
            })
        }
       
        const existingProfile = await profileModel.findOne({ userId: req.user.id });
        
        if (existingProfile) {
            return res.status(400).json({
                success: false,
                message: "Profile already exists. Please update instead.",
            });
        }
        else
        {
            const profile = new profileModel({
            userId:req.user.id,
            name,
            bio,
            experience,
            location,
            education,
            resume,
            skills,
            github
        })
        await profile.save();
        return res.status(200).json({
            success:true,
            message:"Profile Created Successfully"
        })
        }
    }
    catch(error)
    {
        console.log(error.message);
    }

}
export const getProfileController = async(req,res)=>{
    try{
        const profileDetails=await profileModel.findOne({userId:req.user.id})
        if(!profileDetails)
        {
            return res.status(400).json({
                success:false,
                message:"Profile Not Found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Profile Fetched Successfully",
            profileDetails,
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
        const profileId = req.params.id;
        const profileExists = await profileModel.findById(profileId)
        if(!profileExists)
        {
            return res.status(400).json({
                success:false,
                message:"You need to create profile"
            })
        }
        profileExists.name=req.body.name || profileExists.name
        profileExists.bio = req.body.bio || profileExists.bio;
        profileExists.skills = req.body.skills || profileExists.skills;
        profileExists.experience = req.body.experience || profileExists.experience;
        profileExists.location = req.body.location || profileExists.location;
        profileExists.education = req.body.education || profileExists.education;
        profileExists.resume = req.body.resumeURL || profileExists.resume;
        profileExists.github = req.body.githubURL || profileExists.github;
        await profileExists.save();
        return res.status(200).json({
            success:true,
            message:"Profile Updated Successfully"
        })
    }
    catch(error)
    {
        return res.status(400).json({
            success:false,
            message:"Error In Creating Profile"
        })
    }

}
export const allJobsController = async(req,res)=>{
    try{
        const allJobs=await jobModel.find();
        return res.status(200).json({
            success:true,
            message:"All Jobs Fetched Successfully",
            allJobs
        })
    }
    catch(error)
    {
        return res.status(400).json({
            success:false,
            message:"Error In Fetching Jobs"
        })
    }
}
export const browseJobsController = async(req,res) =>{
    try{
        const {title,location,salary}=req.body;
        if(location)
        {
            const allJobs= await jobModel.findOne({location});
            if(!allJobs)
            {
                return res.status(400).json({
                    success:false,
                    message:"No Job found on given location"
                })
            }
            else
            {
                return res.status(200).json({
                    success:true,
                    message:"Job Fetched Successfully",
                    allJobs
                })
            }
        }
        else if(title)
        {
            const allJobs= await jobModel.findOne({title});
            if(!allJobs)
            {
                return res.status(400).json({
                    success:false,
                    message:"No Job found on given title"
                })
            }
            else
            {
                return res.status(200).json({
                    success:true,
                    message:"Job Fetched Successfully",
                    allJobs
                })
            }
        }
        else if(salary)
        {
            const allJobs= await jobModel.findOne({salary});
            if(!allJobs)
            {
                return res.status(400).json({
                    success:false,
                    message:"No Job found on given salary"
                })
            }
            else
            {
                return res.status(200).json({
                    success:true,
                    message:"Job Fetched Successfully",
                    allJobs
                })
            }
        }
    }
    catch(error)
    {
        console.log(error);
    }
}



export const getAppliedJobController = async (req, res) => {
  try {
    const appliedJobs = await applyjobModel
      .find({ applicantId: req.user.id })
      .populate("jobID");

    if (!appliedJobs || appliedJobs.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No jobs applied yet",
        appliedJobs: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Your Applied Jobs",
      appliedJobs,
    });
  } catch (error) {
    console.error("Error in getAppliedJobController:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


export const deleteAppliedJob = async (req,res) =>{
    try{
        const deleteJobId = req.params.id;
        await applyjobModel.findByIdAndDelete(deleteJobId);
        return res.status(200).json({
            success:true,
            message:"Job Deleted Successully"
        })
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"No Jobs Are Applied"
        })
        
    }
}

export const addBookMarkController = async(req,res) =>{
    try{
        const jobId=req.params.id;
        const BookMarkExists  = await bookmarkModel.findOne({jobId});
        if(BookMarkExists)
        {
           
            return res.status(400).json({
                success:false,
                message:"This job is already added to bookmark"
            })
        }
        else
        {
            const BookMark = new bookmarkModel({
                userId:req.user.id,
                jobId,
            })
            await BookMark.save();
            const populatedBookMark = await BookMark.populate("jobId")
            return res.status(200).json({
                success:true,
                message:"Job Added To Bookmark",
                populatedBookMark
            })
        }
    }
    catch(error)
    {
        console.log(error);
    }
    
}

export const viewBookMarkController = async(req,res) =>{
    try{
        const allBookMarks = await bookmarkModel.find({ userId: req.user.id }).populate("jobId");
        if(!allBookMarks){
            return res.status(400).json({
                success:false,
                message:"No Jobs Available In BookMarks"
            })
        }
        else
        {
            return res.status(200).json({
                success:true,
                message:"Jobs In BookMarks",
                allBookMarks
            })
        }
    }
    catch(error)
    {
        console.log(error);
    }
}

export const deleteBookMarkController = async(req,res) =>{
    try{
        const deleteID = req.params.id;
        const bookmark = await bookmarkModel.findById(deleteID);
        if(!bookmark)
        {
            return res.status(400).json({
                success:false,
                message:"Job Not In Bookmark"
            })
        }
        else
        {
            await bookmarkModel.findByIdAndDelete(deleteID);
            return res.status(200).json({
                success:true,
                message:"Deleted"
            })
        }
    }
    catch(error)
    {
        console.log(error);
    }
}

export const applyJobController = async (req, res) => {
  try {
    const { jobID } = req.body;

    const findJob = await jobModel.findById(jobID);
    if (!findJob) {
      return res.status(400).json({
        success: false,
        message: "Job Not Found"
      });
    }

    const alreadyApplied = await applyjobModel.findOne({
      jobID,
      applicantId: req.user.id
    });

    if (alreadyApplied) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this job"
      });
    }

    const applyjob = new applyjobModel({
      jobID,
      applicantId: req.user.id
    });

    await applyjob.save();

    return res.status(200).json({
      success: true,
      message: "Job Applied Successfully",
      applyjob
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAcceptedJobs = async(req,res) =>{
    try {
    const appliedJobs = await applyjobModel
      .find({applicantId: req.user.id ,status:"accepted"})
      .populate("jobID");

    

    return res.status(200).json({
      success: true,
      message: "Your Applied Jobs",
      appliedJobs,
    });
  } catch (error) {
    console.error("Error");
    
  }
}
export const getRejectedJobs = async(req,res) =>{
    try {
    const appliedJobs = await applyjobModel
      .find({applicantId: req.user.id ,status:"rejected"})
      .populate("jobID");
    return res.status(200).json({
      success: true,
      message: "Your Jobs",
      appliedJobs,
    });
  } catch (error) {
    console.error("Error");
  }
}
export const getPendingJobs = async(req,res) =>{
    try {
    const appliedJobs = await applyjobModel
      .find({applicantId: req.user.id ,status:"pending"})
      .populate("jobID");
    return res.status(200).json({
      success: true,
      message: "Your Jobs",
      appliedJobs,
    });
  } catch (error) {
    console.error("Error");
  }
}


