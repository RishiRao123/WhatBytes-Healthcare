import express from "express";
import authUser from "../middlewares/auth.middleware.js";
import {
  validatePatient,
  validatePatientUpdate,
} from "../middlewares/patient.middleware.js";
import {
  addPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
} from "../controllers/patient.controller.js";

const router = express.Router();

// patient routes
router.post("/", authUser, validatePatient, addPatient);
router.get("/", authUser, getPatients);
router.get("/:id", authUser, getPatientById);
router.put("/:id", authUser, validatePatientUpdate, updatePatient);
router.delete("/:id", authUser, deletePatient);

export default router;
