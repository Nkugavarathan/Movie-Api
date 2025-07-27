import Movie from "../models/movie.model.js"

//get all movie
export const movieIndex = async (req, res) => {
  try {
    const movie = await Movie.find()
    res.status(200).json(movie)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

//create movie
export const createMovie = async (req, res) => {
  const { title, desc } = req.body
  const newMovie = new Movie({ title, desc })
  try {
    const savedMovie = await newMovie.save()
    return res.status(201).json(savedMovie)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

//specfic movie get by id
export const specmovieDetail = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)
    if (movie == null) {
      return res.status(404).json({ message: "cannot find movie" })
    } else {
      res.json(movie)
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

//update movie
export const updateMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        desc: req.body.desc,
      },
      { new: true }
    )

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" })
    }

    res.json(updatedMovie)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Delete movie
export const deleteMovie = async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id)
    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" })
    }
    res.json({ message: "Movie deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
