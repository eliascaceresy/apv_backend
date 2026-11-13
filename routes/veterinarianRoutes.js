import express from "express"
import { confirmVeterinarian, createVeterinarian, indexVeterinarian, login, veterinarianProfile } from "../controllers/veterinarianControllers.js";
import checkAuthentication from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", createVeterinarian)
router.post("/confirm_account/:token", confirmVeterinarian)
router.post("/login", login)

router.get("/", indexVeterinarian)
router.get("/profile", checkAuthentication, veterinarianProfile)

export default router;