import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { checkRoleMiddleware } from '../middlewares/checkRoleMiddleware.js';
import { allCandidateController, allJobsController, allRecruiterController, deleteCandidateController, deleteJobController, deleteRecruiterController, viewApplicationsController, viewCandidateProfiles, viewRecruiterProfiles,appliedJobsCountController,pendingJobCount,rejectedJobCount,acceptedJobCount} from '../controllers/adminController.js';

export const adminRoute = express.Router();

adminRoute.get("/all-candidates",allCandidateController)

adminRoute.get("/all-recruiters",allRecruiterController)

adminRoute.get("/all-jobs",allJobsController)

adminRoute.get("/applied-jobs-count",appliedJobsCountController);

adminRoute.delete("/delete-candidate/:id",deleteCandidateController)

adminRoute.delete("/delete-recruiter/:id",deleteRecruiterController)

adminRoute.delete("/delete-job/:id",deleteJobController)

adminRoute.get("/candidate-profiles",viewCandidateProfiles)

adminRoute.get("/recruiter-profiles",viewRecruiterProfiles)

adminRoute.get("/view-applications",viewApplicationsController)

adminRoute.get("/pending-count",pendingJobCount)

adminRoute.get("/rejected-count",rejectedJobCount)

adminRoute.get("/accepted-count",acceptedJobCount)


