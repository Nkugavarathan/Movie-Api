import express from "express"
import movieRoutes from "./routes/movies.route.js"
import connectDB from "./lib/db.js"

const app = express()
const PORT = 8000

app.use(express.json())

const startServer = async () => {
  await connectDB() // 👈 wait for DB before anything else
  app.use("/movies", movieRoutes)

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
  })
}

startServer() // run the async function
