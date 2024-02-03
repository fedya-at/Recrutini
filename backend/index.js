import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import colors from "colors";
import connectToDatabase from "./config/db.js";
import userRoutes from "./routes/userRoute.js";
import cors from "cors";
import appointmentRouter from "./routes/appointmentRouter.js";
import offreRoutes from "./routes/offreRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();  

connectToDatabase();

app.use(cors());

app.use(bodyParser.json());

app.get("/api/candidate/applied-jobs", (req, res) => {
  res.json(candidateAppliedJobs);
});
app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRouter);
app.use("/api/offres", offreRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/upload", uploadRoutes);

// Move this wildcard route to the end
app.get("*", (req, res) => {
  res.status(404).json({ error: "Not Found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.green);
});
