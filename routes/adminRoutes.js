import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { checkRoleMiddleware } from '../middlewares/checkRoleMiddleware.js';
import { allCandidateController, allJobsController, allRecruiterController, deleteCandidateController, deleteJobController, deleteRecruiterController, viewApplicationsController } from '../controllers/adminController.js';

export const adminRoute = express.Router();

adminRoute.get("/all-candidates",authMiddleware,checkRoleMiddleware(['admin']),allCandidateController)

adminRoute.get("/all-recruiters",authMiddleware,checkRoleMiddleware(['admin']),allRecruiterController)

adminRoute.get("/all-jobs",authMiddleware,checkRoleMiddleware(['admin']),allJobsController)

adminRoute.delete("/delete-candidate/:id",authMiddleware,checkRoleMiddleware(['admin']),deleteCandidateController)

adminRoute.delete("/delete-recruiter/:id",authMiddleware,checkRoleMiddleware(['admin']),deleteRecruiterController)

adminRoute.delete("/delete-job/:id",authMiddleware,checkRoleMiddleware(['admin']),deleteJobController)

adminRoute.get("/view-applications",authMiddleware,checkRoleMiddleware(['admin']),viewApplicationsController)

