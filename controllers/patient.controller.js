import Patient from "../models/patient.model.js";

// create a patient
const addPatient = async (req, res) => {
  try {
    const patient = await Patient.create({
      ...req.body,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Patient added successfully",
      data: patient,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// get all patients
const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find({ user: req.user.id });
    res.status(200).json({ success: true, data: patients });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// get patient by his ID
const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!patient) {
      return res
        .status(404)
        .json({ success: false, message: "Patient not found" });
    }

    res.status(200).json({ success: true, data: patient });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// update patient
const updatePatient = async (req, res) => {
  try {
    if (!Object.keys(req.body).length) {
      return res
        .status(400)
        .json({ success: false, message: "No update data provided" });
    }

    const patient = await Patient.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: req.body },
      { new: true }
    );

    if (!patient) {
      return res
        .status(404)
        .json({ success: false, message: "Patient not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Patient updated", data: patient });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// delete patient
const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!patient) {
      return res
        .status(404)
        .json({ success: false, message: "Patient not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  addPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
};
