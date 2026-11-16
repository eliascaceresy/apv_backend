import express from "express";
import { createPatient, indexPatient } from "../controllers/patientController.js";
import checkAuthentication from "./../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(checkAuthentication, indexPatient).post(checkAuthentication, createPatient)

export default router;