import express from "express"
import {
  createMovie,
  deleteMovie,
  movieIndex,
  updateMovie,
  specmovieDetail,
} from "../controllers/movie.controller.js"
const router = express.Router()

//readmovies
router.get("/", movieIndex)

router.get("/:id", specmovieDetail)
//postmovie
router.post("/", createMovie)

//updatemovie
router.put("/:id", updateMovie)

//deletemovie
router.delete("/:id", deleteMovie)

export default router
