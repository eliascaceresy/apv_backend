const indexVeterinarian = (req, res) => {
  res.json("Desde api veterinarios")
}

const veterinarianProfile = (req, res) => {
  res.json("Desde api veterinarios perfil")
}

const createVeterinarian = (req, res) => {
  res.json("Desde api veterinarios crear")
}

export {
  indexVeterinarian,
  veterinarianProfile,
  createVeterinarian
}