import mongoose from "mongoose";
import bcrypt from "bcrypt";

const veterinarianSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    default: null,
    tirm: true
  },
  web: {
    type: String,
    default: null
  },
  confirmed: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    required: true,
    unique: true
  },
  updated_at: {
    type: Date,
    required: true,
    unique: true
  },
  confirmed_at: {
    type: Date
  },
  token: {
    type: String,
    unique: true
  }
})

veterinarianSchema.pre("save", async function(next) {
  if(!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
})

veterinarianSchema.methods.checkPassword = async function(password) {
  return await bcrypt.compare(password, this.password)
}

const Veterinarian = mongoose.model('Veterinarian', veterinarianSchema);

export default Veterinarian;