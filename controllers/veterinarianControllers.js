import Veterinarian from './../models/Veterinarian.js';

const indexVeterinarian = (req, res) => {
  res.json("Desde api veterinarios")
}

const veterinarianProfile = (req, res) => {
  res.json("Desde api veterinarios perfil")
}

const createVeterinarian = async (req, res) => {
  const { email, password, name } = req.body
  try {
    const veterinarian = await new Veterinarian({ email, password, name })
    const veterinarianSaved = await veterinarian.save()
    res.json({ veterinarian: veterinarianSaved })
  } catch (error) {
    console.log(error.message)
  }
}

export {
  indexVeterinarian,
  veterinarianProfile,
  createVeterinarian
}