import mongoose from "mongoose";

const Applicationschema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  CV: {
    type: Buffer,
    required: true,
  },
  CoverLettre: {
    type: String,
  },
  idOfOffre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Offre",
    required: true,
  },
});

const Application = mongoose.model("Application", Applicationschema);

export default Application;
