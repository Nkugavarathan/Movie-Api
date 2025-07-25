import { model, Schema } from "mongoose"

const schema = new Schema({
  //validation
  title: { type: String, required: true, unique: true },
  desc: { type: String, required: true, unique: true },
})

//create model

const Movie = model("Movie", schema)

export default Movie
