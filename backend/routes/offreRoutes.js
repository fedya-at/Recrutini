import express from "express";
import {
  getAllOffers,
  getOfferById,
  createOffer,
  deleteOffer,
  updateOffer,
  getOfferByPostedById,
  searchByCriteria,
} from "../controllers/offreController.js";

const router = express.Router();

router.route("/").get(getAllOffers).post(createOffer);

router.route("/:id").get(getOfferById).put(updateOffer).delete(deleteOffer);
router.route("/postedBy/:PostedBy").get(getOfferByPostedById);
router.route("/searchByCriteria/:location/:skills").get(searchByCriteria);

export default router;
