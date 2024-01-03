// models/appointmentModel.js
import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  hrId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HR",
    required: true,
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Candidate",
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  googleMeetLink: {
    type: String,
    required: true,
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
