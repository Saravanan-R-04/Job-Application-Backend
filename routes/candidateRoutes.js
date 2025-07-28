import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { checkRoleMiddleware } from '../middlewares/checkRoleMiddleware.js';
import { addBookMarkController, applyJobController, browseJobsController, createProfileController, deleteAppliedJob, deleteBookMarkController, getAppliedJobController, updateProfileController, viewBookMarkController } from '../controllers/candidateController.js';

export const candidateRoute = express.Router();

candidateRoute.post("/create-profile",authMiddleware,checkRoleMiddleware(['candidate']),createProfileController)

candidateRoute.put("/update-profile/:id",authMiddleware,checkRoleMiddleware(['candidate']),updateProfileController)

candidateRoute.get("/browse-jobs",authMiddleware,checkRoleMiddleware(['candidate']),browseJobsController)

candidateRoute.post("/apply-job",authMiddleware,checkRoleMiddleware(['candidate']),applyJobController)

candidateRoute.get("/get-applied-jobs",authMiddleware,getAppliedJobController)

candidateRoute.delete("/delete-job/:id",authMiddleware,checkRoleMiddleware(['candidate']),deleteAppliedJob)

candidateRoute.post("/add-bookmark",authMiddleware,checkRoleMiddleware(['candidate']),addBookMarkController)

candidateRoute.get("/view-bookmark",authMiddleware,checkRoleMiddleware(['candidate']),viewBookMarkController)

candidateRoute.delete("/delete-bookmark/:id",authMiddleware,checkRoleMiddleware(['candidate']),deleteBookMarkController)