// Import express and your controller functions
import express from "express"
import {
  createMovie, // POST: create a new movie
  deleteMovie, // DELETE: remove movie by ID
  movieIndex, // GET: list all movies
  updateMovie, // PUT: update movie by ID
  specmovieDetail, // GET: fetch one movie by ID
} from "../controllers/movie.controller.js"

const router = express.Router()

// Route: GET /movies/ -> fetch all movies
router.get("/", movieIndex)

// Route: GET /movies/:id -> fetch a specific movie by ID
router.get("/:id", specmovieDetail)

// Route: POST /movies/ -> create a new movie
router.post("/", createMovie)

// Route: PUT /movies/:id -> update a movie by ID
router.put("/:id", updateMovie)

// Route: DELETE /movies/:id -> delete a movie by ID
router.delete("/:id", deleteMovie)

// Export router to be used in main app
export default router
