import Application from "../models/applicationModel.js";

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

export const createApplication = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    CV,
    CoverLettre,
    idOfOffre,
    etat,
  } = req.body;

  try {
    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const application = new Application({
      firstName,
      lastName,
      email,
      phone,
      CV,
      CoverLettre,
      idOfOffre,
      etat,
    });

    const savedApplication = await application.save();

    res.status(201).json(savedApplication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateApplicationById = async (req, res) => {
  const applicationId = req.params.id;
  const { firstname, lastname, email, phone, CV, CoverLettre, etat } = req.body;
  try {
    const updatedApplication = await Application.findByIdAndUpdate(
      applicationId,
      {
        firstName: firstname,
        lastName: lastname,
        email: email,
        phone: phone,
        CV: CV,
        CoverLettre: CoverLettre,
        etat: etat,
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
