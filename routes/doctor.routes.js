import express from "express";
import {
  addDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctor.controller.js";
import authUser from "../middlewares/auth.middleware.js";
import {
  validateCreateDoctor,
  validateUpdateDoctor,
} from "../middlewares/doctor.middleware.js";

const router = express.Router();

// doctor routes
router.post("/", authUser, validateCreateDoctor, addDoctor);
router.get("/", getDoctors);
router.get("/:id", getDoctorById);
router.put("/:id", authUser, validateUpdateDoctor, updateDoctor);
router.delete("/:id", authUser, deleteDoctor);

export default router;
