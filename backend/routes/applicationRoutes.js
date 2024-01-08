import express from "express";
import {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplicationById,
  deleteApplicationById,
} from "../controllers/applicationController.js";

const router = express.Router();

router.route("/").get(getAllApplications).post(createApplication);
router
  .route("/:id")
  .get(getApplicationById)
  .put(updateApplicationById)
  .delete(deleteApplicationById);

export default router;
