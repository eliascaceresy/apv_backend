import mongoose from "mongoose"

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
  }

})

const Veterinarian = mongoose.model('Veterinarian', veterinarianSchema);

export default Veterinarian;