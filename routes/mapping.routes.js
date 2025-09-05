import express from "express";
import authUser from "../middlewares/auth.middleware.js";
import {
  createMapping,
  getAllMappings,
  getDoctorsByPatient,
  deleteMapping,
} from "../controllers/mapping.controller.js";
import {
  validateCreateMapping,
  validatePatientId,
  validateMappingId,
} from "../middlewares/validateMapping.middleware.js";

const router = express.Router();

router.post("/", authUser, validateCreateMapping, createMapping);
router.get("/", getAllMappings);
router.get("/:patientId", validatePatientId, getDoctorsByPatient);
router.delete("/:id", authUser, validateMappingId, deleteMapping);

export default router;
