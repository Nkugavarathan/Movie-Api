import express from "express"
import movieRoutes from "./routes/movies.route.js"
import connectDB from "./lib/db.js"

import dotenv from "dotenv"
dotenv.config()
const port = process.env.PORT || 5000
const app = express()

app.use(express.json())

const startServer = async () => {
  await connectDB() // 👈 wait for DB before anything else
  app.use("/movies", movieRoutes)

  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`)
  })
}

startServer() // run the async function
