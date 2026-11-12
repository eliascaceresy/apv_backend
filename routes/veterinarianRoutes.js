import express from "express"
import { createVeterinarian, indexVeterinarian, veterinarianProfile } from "../controllers/veterinarianControllers.js";

const router = express.Router();

router.get("/", indexVeterinarian)
router.post("/register", createVeterinarian)
router.get("/profile", veterinarianProfile)

export default router;