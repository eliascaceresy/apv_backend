import generateJWT from "../utils/jwt.js";
import generateToken from "../utils/token.js";
import Veterinarian from './../models/Veterinarian.js';

const indexVeterinarian = (req, res) => {
  res.json("Desde api veterinarios")
}

const veterinarianProfile = (req, res) => {
  const { veterinarian } = req
  res.json({ profile: veterinarian })
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

const login = async (req, res) => {
  const { email, password } = req.body

  const veterinarian = await Veterinarian.findOne({ email })
  if (!veterinarian) {
    const error = new Error("Email o contraseña inválidos!")
    return res.status(403).json({ msg: error.message })
  }

  if (!veterinarian.confirmed) {
    const error = new Error("Tu cuenta no ha sido confirmada!")
    return res.status(403).json({ msg: error.message })
  }

  if (await veterinarian.checkPassword(password)) {
    return res.json({ token: generateJWT(veterinarian.id) })
  } else {
    const error = new Error("Email o contraseña inválidos!")
    return res.status(403).json({ msg: error.message })
  }
}

const forgetPassword = async (req, res) => {
  const { email } = req.body
  const veterinarian = await Veterinarian.findOne({ email })

  if (veterinarian) {
    try {
      veterinarian.token = generateToken()
      await veterinarian.save()
    } catch (error) {
      console.log(error)
    }
  }

  res.json({ msg: "Si tu cuenta existe, recibirás un email para cambiar tu contraseña!"})
}
const checkTokenChangePassword = async (req, res) => {
  const { token } = req.params;

  const validToken = await Veterinarian.findOne({ token });

  if (validToken) {
    res.json({ msg: "Token válido"})
  } else {
    const error = new Error("El token es inválido!")
    res.status(403).json({ msg: error.message })
  }
}

const changePassword = async (req, res) => {
  const { token } = req.params
  const { password, password_confirmation } = req.body

  const veterinarian = await Veterinarian.findOne({ token })

  if (!veterinarian) {
    const error = new Error("Hubo un error!")
    return res.status(401).json({ msg: error.message })
  }

  if (password !== password_confirmation) {
     const error = new Error("Las constraseñas no coinciden!")
    return res.status(401).json({ msg: error.message })
  }

  try {
    veterinarian.token = null;
    veterinarian.password = password
    await veterinarian.save()
    return res.status(200).json({ msg: "La contraseña se cambió exitosamente!"})
  } catch (error) {
    console.log(error)
  }
}

export {
  indexVeterinarian,
  veterinarianProfile,
  createVeterinarian,
  confirmVeterinarian,
  login,
  forgetPassword,
  checkTokenChangePassword,
  changePassword
}