import express from "express"
import { confirmVeterinarian, createVeterinarian, indexVeterinarian, veterinarianProfile } from "../controllers/veterinarianControllers.js";

const router = express.Router();

router.get("/", indexVeterinarian)
router.post("/register", createVeterinarian)
router.get("/profile", veterinarianProfile)
router.post("/confirm_account/:token", confirmVeterinarian)

export default router;