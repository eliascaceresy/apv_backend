const indexPatient = (req, res) => {
  res.json("Desde index pacientes por veterinario")
}

const createPatient = (req, res) => {
  res.json("Desde crear pacientes")
}

export {
  indexPatient,
  createPatient
}