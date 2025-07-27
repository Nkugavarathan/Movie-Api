// Import required Mongoose functions
import { model, Schema } from "mongoose"

// Define the schema (blueprint) for Movie documents
const schema = new Schema({
  // 'title' is required and must be unique
  title: { type: String, required: true, unique: true },

  // 'desc' is required (movie description)
  desc: { type: String, required: true },
})

// Create the Movie model using the schema
// This model connects to the 'movies' collection in MongoDB
const Movie = model("Movie", schema)

// Export the model so it can be used in controllers
export default Movie
