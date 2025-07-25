import Movie from "../models/movie.model.js"

export const movieIndex = async (req, res) => {
  try {
    const movie = await Movie.find()
    res.status(200).json(movie)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
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
  try {
  } catch (error) {}
}
export const deleteMovie = (req, res) => {
  try {
  } catch (error) {}
}
