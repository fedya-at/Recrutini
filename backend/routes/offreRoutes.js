import express from "express";
import {
  getAllOffers,
  getOfferById,
  createOffer,
  deleteOffer,
  updateOffer,
} from "../controllers/offreController.js";

const router = express.Router();

router.route("/").get(getAllOffers).post(createOffer);

router.route("/:id").get(getOfferById).put(updateOffer).delete(deleteOffer);

export default router;
