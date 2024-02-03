import express from "express";
import {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplicationById,
  deleteApplicationById,
  getApplicationsByUserId,
  getApplicationByOffreId,
  getApprovedApplications,
} from "../controllers/applicationController.js";

const router = express.Router();

router.route("/").get(getAllApplications).post(createApplication);
router
  .route("/:id")
  .get(getApplicationById)
  .put(updateApplicationById)
  .delete(deleteApplicationById);
router.route("/user/:userId").get(getApplicationsByUserId);
router.route("/:offreId").get(getApplicationByOffreId);
router.route("/approved/userIds").get(getApprovedApplications);

export default router;
