import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkRoleMiddleware } from "../middlewares/checkRoleMiddleware.js";
import { createJobController,updateJobController,deleteJobController,getAllJobsController, jobApplicantController, jobApplicantProfileController, markJobController, createProfileController, updateProfileController } from "../controllers/recruiterController.js";
import express from 'express'

export const recruiterRoute = express.Router();

recruiterRoute.post("/create-profile",authMiddleware,checkRoleMiddleware(['recruiter']),createProfileController)

recruiterRoute.put("/update-profile/:id",authMiddleware,checkRoleMiddleware(['recruiter']),updateProfileController)

recruiterRoute.post("/create-job",authMiddleware,checkRoleMiddleware(['recruiter']),createJobController)

recruiterRoute.put("/update-job/:id",authMiddleware,checkRoleMiddleware(['recruiter']),updateJobController)

recruiterRoute.delete("/delete-job/:id",authMiddleware,checkRoleMiddleware(['recruiter']),deleteJobController)

recruiterRoute.get("/get-all-jobs",authMiddleware,checkRoleMiddleware(['recruiter']),getAllJobsController)

recruiterRoute.get("/job-applicants",authMiddleware,jobApplicantController)

recruiterRoute.get("/applicant-profile/:id",authMiddleware,checkRoleMiddleware(['recruiter']),jobApplicantProfileController)

recruiterRoute.put("/mark-job/:id",authMiddleware,checkRoleMiddleware(['recruiter']),markJobController)