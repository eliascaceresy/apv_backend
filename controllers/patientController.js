import Patient from "../models/Patient.js"

const indexPatient = async (req, res) => {
  const patients = await Patient.find().where({ veterinarian_id: req.veterinarian._id })
  res.status(200).json({ patients })
}

const createPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body)
    patient.veterinarian_id = req.veterinarian._id
    const patientSaved = await patient.save()
    res.status(201).json({ patient: patientSaved })
  } catch (error) {
    res.status(422).json({ msg: error })
  }
}

export {
  indexPatient,
  createPatient
}