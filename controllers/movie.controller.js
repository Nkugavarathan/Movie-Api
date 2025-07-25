import Movie from "../models/movie.model.js"

export const movieIndex = (req, res) => {
  res.send("Get all movie lists")
}
export const createMovie = async (req, res) => {
  // console.log(req.body)

  const newMovie = new Movie({ title: req.body.title, desc: req.body.desc })
  try {
    const savedMovie = await newMovie.save()
    return res.status(201).json(savedMovie)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}
export const updateMovie = (req, res) => {
  res.send("movie updated")
}
export const deleteMovie = (req, res) => {
  res.send("movie deleted")
}
