import express from "express"

const app = express()
const PORT = 5000

app.get("/", (req, res) => {
  //   res.json({ msg: "Hellow words" })
  res.send("Hello from Express")
})

//readmovies
app.get("/movies", (req, res) => {})

//postmovie
app.post("/movies", (req, res) => {})

//updatemovie
app.update("/movies/:id", (req, res) => {})

//deletemovie
app.get("/movies/:id", (req, res) => {})

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`)
})
