import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import Veterinarian from "../models/Veterinarian.js";

dotenv.config();

const checkAuthentication = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(403).json({ msg: "Token invalido!" });
  }

  let decoded;
  try {
    const token = authorization.split(" ")[1];
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(403).json({ msg: "Token invalido!" });
  }

  req.veterinarian = await Veterinarian.findById(decoded.id).select("-password -token");
  if (!req.veterinarian) {
    return res.status(403).json({ msg: "Token invalido!" });
  }

  return next();
}

export default checkAuthentication;