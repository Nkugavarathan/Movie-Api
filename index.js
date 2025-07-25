import express from "express"
import movieRoutes from "./routes/movies.route.js"
import connectDB from "./lib/db.js"
const app = express()
const PORT = 8000

// app.get("/", (req, res) => {
//   res.send("Welcome to the Movie API!")
// })

app.use(express.json())
//connect db
connectDB()

app.use("/movies", movieRoutes)
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`)
})
