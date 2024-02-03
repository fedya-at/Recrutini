import Offre from "../models/offreModel.js";

// Get all offers
export const getAllOffers = async (req, res) => {
  try {
    const offers = await Offre.find();
    res.status(200).json(offers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get offer by ID
export const getOfferById = async (req, res) => {
  const offerId = req.params.id;

  try {
    const offer = await Offre.findById(offerId);
    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }

    res.status(200).json(offer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new offer
export const createOffer = async (req, res) => {
  const {
    title,
    company,
    companyDescription,
    roleDescription,
    employeesNeeded,
    location,
    description,
    skills,
    salary,
    whatWeOffre,
    dateFin,
    Postedby,
  } = req.body;

  try {
    const newOffer = new Offre({
      title,
      company,
      companyDescription,
      roleDescription,
      employeesNeeded,
      location,
      description,
      skills,
      salary,
      whatWeOffre,
      dateFin,
      Postedby,
    });

    const savedOffer = await newOffer.save();
    res.status(201).json(savedOffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update an existing offer
export const updateOffer = async (req, res) => {
  const offerId = req.params.id;
  const updatedOfferData = req.body;

  try {
    const updatedOffer = await Offre.findByIdAndUpdate(
      offerId,
      updatedOfferData,
      {
        new: true,
      }
    );

    if (!updatedOffer) {
      return res.status(404).json({ error: "Offer not found" });
    }

    res.status(200).json(updatedOffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete an offer
export const deleteOffer = async (req, res) => {
  const offerId = req.params.id;

  try {
    const deletedOffer = await Offre.findByIdAndDelete(offerId);

    if (!deletedOffer) {
      return res.status(404).json({ error: "Offer not found" });
    }

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get offer by PostByID
export const getOfferByPostedById = async (req, res) => {
  try {
    const postedById = req.params.PostedBy; // Ensure the parameter name matches your route definition

    const offers = await Offre.find({ Postedby: postedById }).exec();

    res.status(200).json({ offers });
  } catch (error) {
    console.error("Error fetching job offers:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const searchByCriteria = async (req, res) => {
  const { location, skills } = req.params;
  console.log("Searching for location and skills:", location, skills);

  try {
    const offres = await Offre.find({
      location: location,
      $or: [
        { skills: { $regex: new RegExp(skills, "i") } },
        { title: { $regex: new RegExp(skills, "i") } },
      ],
    });

    if (!offres || offres.length === 0) {
      console.log("No job offers found for the specified criteria");
      res.status(404).send("No job offers found for the specified criteria");
    } else {
      res.json(offres);
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("Something went wrong on the server");
  }
};
