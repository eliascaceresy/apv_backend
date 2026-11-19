import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import veterinarianRoutes from "./routes/veterinarianRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

connectDB();

const enabledDomains = [
  ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || enabledDomains.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use("/api/veterinarians", veterinarianRoutes);
app.use("/api/patients", patientRoutes);

app.listen(port, () => {
  console.log(`El sevidor esta en ${port}`);
});
