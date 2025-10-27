import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { checkRoleMiddleware } from '../middlewares/checkRoleMiddleware.js';
import { addBookMarkController, applyJobController, browseJobsController, createProfileController, deleteAppliedJob, deleteBookMarkController, getAppliedJobController, updateProfileController, viewBookMarkController,allJobsController, getProfileController,getAcceptedJobs, getRejectedJobs, getPendingJobs} from '../controllers/candidateController.js';

export const candidateRoute = express.Router();

candidateRoute.post("/create-profile",authMiddleware,checkRoleMiddleware(['Candidate']),createProfileController)

candidateRoute.get("/get-profile",authMiddleware,checkRoleMiddleware(['Candidate']),getProfileController)

candidateRoute.put("/update-profile/:id",authMiddleware,checkRoleMiddleware(['Candidate']),updateProfileController)

candidateRoute.get("/all-jobs",authMiddleware,checkRoleMiddleware(['Candidate']),allJobsController)

candidateRoute.get("/browse-jobs",authMiddleware,checkRoleMiddleware(['Candidate']),browseJobsController)

candidateRoute.post("/apply-job",authMiddleware,checkRoleMiddleware(['Candidate']),applyJobController)

candidateRoute.get("/get-applied-jobs",authMiddleware,checkRoleMiddleware(['Candidate']),getAppliedJobController)

candidateRoute.delete("/delete-job/:id",authMiddleware,checkRoleMiddleware(['Candidate']),deleteAppliedJob)

candidateRoute.post("/add-bookmark/:id",authMiddleware,checkRoleMiddleware(['Candidate']),addBookMarkController)

candidateRoute.get("/view-bookmark",authMiddleware,checkRoleMiddleware(['Candidate']),viewBookMarkController)

candidateRoute.delete("/delete-bookmark/:id",authMiddleware,checkRoleMiddleware(['Candidate']),deleteBookMarkController)

candidateRoute.get("/get-accepted-jobs",authMiddleware,checkRoleMiddleware(['Candidate']),getAcceptedJobs)

candidateRoute.get("/get-rejected-jobs",authMiddleware,checkRoleMiddleware(['Candidate']),getRejectedJobs)

candidateRoute.get("/get-pending-jobs",authMiddleware,checkRoleMiddleware(['Candidate']),getPendingJobs)