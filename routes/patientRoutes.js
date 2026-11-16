import express from "express";
import { createPatient, deletePatient, indexPatient, showPatient, updatePatient } from "../controllers/patientController.js";
import checkAuthentication from "./../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(checkAuthentication, indexPatient)
  .post(checkAuthentication, createPatient)

router.route("/:id")
  .get(checkAuthentication, showPatient)
  .put(checkAuthentication, updatePatient)
  .delete(checkAuthentication, deletePatient)

export default router;