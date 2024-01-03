import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import colors from "colors";
import connectToDatabase from "./config/db.js";
import userRoutes from "./routes/userRoute.js";
import cors from "cors";
import appointmentRouter from "./routes/appointmentRouter.js";
import offreRoutes from "./routes/offreRoutes.js";
const app = express();

connectToDatabase();

app.use(cors());

app.use(bodyParser.json());

const candidateAppliedJobs = [
  { id: 1, title: "Job A", status: "Not Seen" },
  { id: 2, title: "Job B", status: "Reviewing" },
  { id: 3, title: "Job C", status: "Accepted" },
];

app.get("/api/candidate/applied-jobs", (req, res) => {
  res.json(candidateAppliedJobs);
});
app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRouter);
app.use("/api/offres", offreRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.green);
});
