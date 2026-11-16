import express from "express";
import { createPatient, indexPatient } from "../controllers/patientController.js";

const router = express.Router();

router.route("/").get(indexPatient).post(createPatient)

export default router;