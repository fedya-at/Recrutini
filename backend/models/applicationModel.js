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
  phone:{
    type: String,
    required: true,
  },
  CV: {
    type: String,
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
  etat:{
    type: String,
    enum: ["unseen", "seen", "approved","refused"],
    default: "unseen",
  },
});

const Application = mongoose.model("Application", Applicationschema);

export default Application;
