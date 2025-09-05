import DoctorModel from "../models/doctor.model.js";
import { handleError } from "../constants/constants.js";

// Add Doctor
const addDoctor = async (req, res) => {
  try {
    const { name, specialization, experience, study } = req.body;

    const doctor = new DoctorModel({
      name,
      specialization,
      experience,
      study,
      user: req.user.id,
    });

    await doctor.save();

    res.status(201).json({
      message: "Doctor created successfully",
      success: true,
      doctor,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Get all Doctors
const getDoctors = async (req, res) => {
  try {
    const doctors = await DoctorModel.find();

    res.status(200).json({
      success: true,
      doctors,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Get Doctor by ID
const getDoctorById = async (req, res) => {
  try {
    const doctor = await DoctorModel.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      doctor,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Update Doctor
const updateDoctor = async (req, res) => {
  try {
    const doctor = await DoctorModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Doctor updated successfully",
      success: true,
      doctor,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Delete Doctor
const deleteDoctor = async (req, res) => {
  try {
    const doctor = await DoctorModel.findByIdAndDelete(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Doctor deleted successfully",
      success: true,
    });
  } catch (error) {
    handleError(res, error);
  }
};

export { addDoctor, getDoctors, getDoctorById, updateDoctor, deleteDoctor };
