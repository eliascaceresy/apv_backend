import mongoose from "mongoose";
import bcrypt from "bcrypt";

const patientSchema = new mongoose.Schema(
  {
    petName: {
      type: String,
      required: true,
      trim: true,
    },
    ownerName: {
      type: String,
      required: true,
      trim: true,
    },
    registrationAt: {
      type: Date,
      trim: true,
    },
    ownerPhone: {
      type: String,
      default: null,
      tirm: true,
    },
    ownerEmail: {
      type: String,
      required: true,
      trim: true,
    },
    petSymptoms: {
      type: String,
      required: true,
      trim: true,
    },
    veterinarianId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Veterinarian",
      required: true,
    },
    petType: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
