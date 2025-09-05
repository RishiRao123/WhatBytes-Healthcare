import Mapping from "../models/mapping.model.js";
import Patient from "../models/patient.model.js";
import Doctor from "../models/doctor.model.js";
import { handleError } from "../constants/constants.js";

// Assign doctor to patient
export const createMapping = async (req, res) => {
  try {
    const { patient, doctor } = req.body;

    const patientExists = await Patient.findById(patient);
    if (!patientExists) {
      return res
        .status(404)
        .json({ success: false, message: "Patient not found" });
    }

    const doctorExists = await Doctor.findById(doctor);
    if (!doctorExists) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    const mapping = await Mapping.create({
      patient,
      doctor,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Mapping created successfully",
      mapping,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Get all mappings
export const getAllMappings = async (req, res) => {
  try {
    const mappings = await Mapping.find()
      .populate("patient", "name age gender disease")
      .populate("doctor", "name specialization experience study");

    res.status(200).json({ success: true, mappings });
  } catch (error) {
    handleError(res, error);
  }
};

// Get doctors by patient
export const getDoctorsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;

    const mappings = await Mapping.find({ patient: patientId }).populate(
      "doctor",
      "name specialization experience study"
    );

    res.status(200).json({
      success: true,
      doctors: mappings.map((m) => m.doctor),
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Delete mapping
export const deleteMapping = async (req, res) => {
  try {
    const { id } = req.params;

    const mapping = await Mapping.findByIdAndDelete(id);
    if (!mapping) {
      return res
        .status(404)
        .json({ success: false, message: "Mapping not found" });
    }

    res.status(200).json({
      success: true,
      message: "Mapping deleted successfully",
    });
  } catch (error) {
    handleError(res, error);
  }
};
