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

const showPatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id)

    if (patient && patient.veterinarian_id.toString !== req.veterinarian._id.toString) {
      return res.status(403).json({ msg: "No estás autorizado!"})
    }
    res.status(200).json({ patient })
  } catch (error) {
    console.log(error)
  }
}

const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id)

    if (!patient) {
      return res.status(404).json({ msg: "No encontrado!"})
    } else if (patient.veterinarian_id.toString !== req.veterinarian._id.toString) {
      return res.status(403).json({ msg: "No estás autorizado!"})
    } else {
      const updatedPatient = await patient.updateOne(req.body)
      res.status(200).json({ patient: updatedPatient })
    }
  } catch (error) {
    console.log(error)
  }
}

const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id)

    if (!patient) {
      return res.status(404).json({ msg: "No encontrado!"})
    } else if (patient.veterinarian_id.toString !== req.veterinarian._id.toString) {
      return res.status(403).json({ msg: "No estás autorizado!"})
    } else {
      await patient.deleteOne()
      res.status(200).json({ msg: "Paciente eliminado exitosamente!" })
    }
  } catch (error) {
    console.log(error)
  }
}

export {
  indexPatient,
  createPatient,
  showPatient,
  updatePatient,
  deletePatient
}