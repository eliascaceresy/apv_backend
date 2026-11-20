import express from "express";
import {
  changePassword,
  changeProfilePassword,
  checkTokenChangePassword,
  confirmVeterinarian,
  createVeterinarian,
  forgetPassword,
  indexVeterinarian,
  login,
  updateProfile,
  veterinarianProfile,
} from "../controllers/veterinarianController.js";
import checkAuthentication from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", createVeterinarian);
router.post("/confirm_account/:token", confirmVeterinarian);
router.post("/login", login);
router.post("/forget_password", forgetPassword);
router.get("/check_token_change_password/:token", checkTokenChangePassword);
router.post("/change_password/:token", changePassword);

router.get("/", indexVeterinarian);
router.get("/profile", checkAuthentication, veterinarianProfile);
router.put(
  "/profile/change_profile_password",
  checkAuthentication,
  changeProfilePassword,
);
router.put("/profile/:id", checkAuthentication, updateProfile);

export default router;
