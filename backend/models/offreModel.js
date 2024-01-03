import { text } from "express";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const offreTravailSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  companyDescription: {
    type: String,
    required: true,
  },
  employeesNeeded: Number,
  RoleDescription: {
    type: String,
    required: true,
  },
  location: String,
  description: String,
  skills: [String],
  salary: Number,
  postedAt: {
    type: Date,
    default: Date.now,
  },
  whatWeOffre: {
    type: String,
    required: true,
  },
  dateFin: {
    type: Date,
    required: true,
  },
});

const Offre = mongoose.model("OffreTravail", offreTravailSchema);

export default Offre;