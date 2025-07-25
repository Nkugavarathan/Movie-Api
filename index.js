import express from "express"
import movieRoutes from "./routes/movies.route.js"
const app = express()
const PORT = 5000

app.get("/", () => {
  res.json({ msg: "hello" })
})

app.use("/movies", movieRoutes)
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`)
})
