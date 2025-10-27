import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkRoleMiddleware } from "../middlewares/checkRoleMiddleware.js";
import { createJobController,updateJobController,deleteJobController,getAllJobsController, jobApplicantController, jobApplicantProfileController, acceptJobController,rejectJobController, createProfileController, updateProfileController,getProfileController} from "../controllers/recruiterController.js";
import express from 'express'

export const recruiterRoute = express.Router();

recruiterRoute.post("/create-profile",authMiddleware,checkRoleMiddleware(['Recruiter']),createProfileController)

recruiterRoute.put("/update-profile/:id",authMiddleware,checkRoleMiddleware(['Recruiter']),updateProfileController)

recruiterRoute.get("/r-get-profile",authMiddleware,checkRoleMiddleware(['Recruiter']),getProfileController)

recruiterRoute.post("/create-job",authMiddleware,checkRoleMiddleware(['Recruiter']),createJobController)

recruiterRoute.put("/update-job/:id",authMiddleware,checkRoleMiddleware(['Recruiter']),updateJobController)

recruiterRoute.delete("/delete-job/:id",authMiddleware,checkRoleMiddleware(['Recruiter']),deleteJobController)

recruiterRoute.get("/get-all-jobs",authMiddleware,checkRoleMiddleware(['Recruiter']),getAllJobsController)

recruiterRoute.get("/job-applicants",authMiddleware,jobApplicantController)

recruiterRoute.get("/applicant-profile/:id",authMiddleware,checkRoleMiddleware(['Recruiter']),jobApplicantProfileController)

recruiterRoute.put("/accept-job/:id",authMiddleware,checkRoleMiddleware(['Recruiter']),acceptJobController)

recruiterRoute.put("/reject-job/:id",authMiddleware,checkRoleMiddleware(['Recruiter']),rejectJobController)