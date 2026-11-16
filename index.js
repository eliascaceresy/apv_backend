import express from "express"
import connectDB from "./config/db.js"
import veterinarianRoutes from "./routes/veterinarianRoutes.js"
import patientRoutes from "./routes/patientRoutes.js"

const app = express()
const port = process.env.PORT || 4000

app.use(express.json());

connectDB();

app.use("/api/veterinarians", veterinarianRoutes);
app.use("/api/patients", patientRoutes)

app.listen(port, () => {
  console.log(`El sevidor esta en ${port}`)
});