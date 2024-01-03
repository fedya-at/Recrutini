// routes/appointmentRouter.js
import express from "express";
import {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointmentById,
  deleteAppointmentById,
  getAppointmentsByDate,
} from "../controllers/appointmentController.js";

const router = express.Router();

router
  .route("/")
  .get(getAllAppointments)
  .post(createAppointment)
  .get(getAppointmentsByDate);

router
  .route("/:id")
  .get(getAppointmentById)
  .put(updateAppointmentById)
  .delete(deleteAppointmentById);
  

export default router;
