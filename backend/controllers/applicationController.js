import Application from "../models/applicationModel.js";
import multer from "multer";
import path from "path";

export const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find();
    res.status(200).json(applications);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getApplicationById = async (req, res) => {
  const applicationId = req.params.id;
  try {
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }
    res.status(200).json(application);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only PDF files are allowed."), false);
  }
};

const upload = multer({ storage, fileFilter });

export const createApplication = async (req, res) => {
  try {
    const { firstName, lastName, email, CoverLetter, idOfOffre } = req.body;
    console.log(req.body);

    // Use multer middleware to handle the file upload
    upload.single("CV")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const cvBuffer = req.file ? req.file.buffer : undefined;

      const newApplication = new Application({
        firstName,
        lastName,
        email,
        CV: cvBuffer,
        CoverLetter,
        idOfOffre,
      });

      const savedApplication = await newApplication.save();

      res.status(201).json(savedApplication);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateApplicationById = async (req, res) => {
  const applicationId = req.params.id;
  const { firstname, lastname, email, CV, CoverLettre } = req.body;
  try {
    const updatedApplication = await Application.findByIdAndUpdate(
      applicationId,
      {
        firstName: firstname,
        lastName: lastname,
        email: email,
        CV: CV,
        CoverLetter: CoverLettre,
      },
      { new: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({ error: "Application not found" });
    }

    res.status(200).json(updatedApplication);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteApplicationById = async (req, res) => {
  const applicationId = req.params.id;
  try {
    const deletedApplication = await Application.findByIdAndRemove(
      applicationId
    );

    if (!deletedApplication) {
      return res.status(404).json({ error: "Application not found" });
    }

    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
