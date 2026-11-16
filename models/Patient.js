import mongoose from "mongoose";
import bcrypt from "bcrypt";

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  owner: {
    type: String,
    required: true,
    trim: true
  },
  registration_date: {
    type: Date,
    trim: true,
  },
  phone: {
    type: String,
    default: null,
    tirm: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  symptoms: {
    type: String,
    required: true,
    trim: true
  },
  veterinarian_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Veterinarian",
    required: true
  },
  pet_type: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
})

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;