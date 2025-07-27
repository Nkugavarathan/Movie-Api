// Import the Movie model (schema connected to the 'movies' collection in MongoDB)
import Movie from "../models/movie.model.js"

//
// GET all movies
//
// Movie.find() → Fetches all documents in the 'movies' collection
//
export const movieIndex = async (req, res) => {
  try {
    const movie = await Movie.find()
    res.status(200).json(movie)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

//
// CREATE a new movie
//
// new Movie({...}) → Creates a new Movie document (not saved yet)
// .save() → Saves the document to the database
//
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

//
// GET a specific movie by ID
//
// Movie.findById(id) → Finds a single movie document by its MongoDB ObjectId
//
export const specmovieDetail = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)

    if (movie == null) {
      return res.status(404).json({ message: "Cannot find movie" })
    } else {
      res.json(movie)
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

//
// UPDATE a movie by ID
//
// Movie.findByIdAndUpdate(id, updateObj, options)
// → Finds movie by ID and updates fields (title, desc)
// → `{ new: true }` returns the updated document instead of the old one
//
export const updateMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        desc: req.body.desc,
      },
      { new: true } // Return the updated document
    )

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" })
    }

    res.json(updatedMovie)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//
// DELETE a movie by ID
//
// Movie.findByIdAndDelete(id)
// → Finds movie by ID and deletes it from the collection
//
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

/*
Method	Purpose
find()	- Get all documents
new Model({...})-	Create a new document (not saved)
.save()-	Save a new document to DB
findById(id)-	Get a single document by ID
findByIdAndUpdate()-	Update a document by ID
findByIdAndDelete()-	Delete a document by ID

*/
