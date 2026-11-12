import express from "express"

const app = express()
const port = process.env.PORT || 4000

app.use('/', (req, res) => {
  res.send("Hola mundo")
})

app.listen(port, () => {
  console.log(`El sevidor esta en ${port}`)
})