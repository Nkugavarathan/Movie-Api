// Import express, routes, DB connection, and dotenv
import express from "express"
import movieRoutes from "./routes/movies.route.js"
import connectDB from "./lib/db.js" // file that connects to MongoDB
import cors from "cors"
import dotenv from "dotenv"

dotenv.config() // load variables from .env file

const port = process.env.PORT || 5000 // fallback port if .env is missing
const app = express()

app.use(cors({ origin: "http://localhost:5173" }))

// Middleware: parse incoming JSON requests
app.use(express.json())

// Async function to start the server
const startServer = async () => {
  await connectDB() // 👈 wait until MongoDB is connected

  // Route: all /movies/* routes will be handled by movieRoutes
  app.use("/movies", movieRoutes)

  // Start the Express server
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`)
  })
}

// Call the async function to launch the app
startServer()
