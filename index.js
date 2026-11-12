import express from "express"
import connectDB from "./config/db.js"

const app = express()
const port = process.env.PORT || 4000

connectDB();

app.use('/', (req, res) => {
  res.send("Hola mundo")
});

app.listen(port, () => {
  console.log(`El sevidor esta en ${port}`)
});