import generateToken from "../utils/token.js";
import Veterinarian from './../models/Veterinarian.js';

const indexVeterinarian = (req, res) => {
  res.json("Desde api veterinarios")
}

const veterinarianProfile = (req, res) => {
  res.json("Desde api veterinarios perfil")
}

const createVeterinarian = async (req, res) => {
  const { email, password, name } = req.body

  const existVeterinarian = await Veterinarian.findOne({ email })

  if (existVeterinarian) {
    const error = new Error("El email ya se encuentra registrado!")
    res.status(403).json({ msg: error.message })
    return;
  }

  try {
    const veterinarian = await new Veterinarian({ email, password, name, created_at: Date.now(), updated_at: Date.now(), token: generateToken() })
    console.log(veterinarian)
    const veterinarianSaved = await veterinarian.save()
    res.status(201).json({ veterinarian: veterinarianSaved })
  } catch (error) {
    console.log(error.message)
  }
}

const confirmVeterinarian = async (req, res) => {
  const { token } = req.params
  const veterinarian = await Veterinarian.findOne({ token })
  try {
    if (veterinarian) {
      const veterinarianConfirmed = await veterinarian.updateOne({ token: null, confirmed: true, confirmed_at: Date.now(), updated_at: Date.now() })
      res.status(200).json({ veterinarian: veterinarianConfirmed })
    } else  {
      const error = new Error("No se encontro una cuenta asociada para confirmar!")
      res.status(403).json({ msg: error.message })
    }
  } catch (error) {
    console.log(error)
  }
}

export {
  indexVeterinarian,
  veterinarianProfile,
  createVeterinarian,
  confirmVeterinarian
}