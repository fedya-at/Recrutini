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
