import { useState, useEffect } from "react"
import axios from "axios"
import "./App.css"

function App() {
  const [movies, setMovies] = useState([])
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [updateId, setUpdateId] = useState(null) // null means no movie selected for edit

  // Fetch all movies (READ)
  const fetchMovies = async () => {
    try {
      const res = await axios.get("http://localhost:8000/movies")
      setMovies(res.data)
    } catch (error) {
      console.error("Error fetching movies:", error.message)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  // Create movie (POST)
  const handleAdd = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:8000/movies", { title, desc })
      setTitle("")
      setDesc("")
      fetchMovies()
    } catch (error) {
      console.error("Error adding movie:", error.message)
    }
  }

  // Update movie (PUT)
  const handleUpdate = async (e) => {
    e.preventDefault()
    if (!updateId) return alert("Select a movie to update by clicking Edit")
    try {
      await axios.put(`http://localhost:8000/movies/${updateId}`, {
        title,
        desc,
      })
      setTitle("")
      setDesc("")
      setUpdateId(null)
      fetchMovies()
    } catch (error) {
      console.error("Error updating movie:", error.message)
    }
  }

  // Delete movie (DELETE)
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/movies/${id}`)
      // If deleting the movie being edited, reset form
      if (updateId === id) {
        setUpdateId(null)
        setTitle("")
        setDesc("")
      }
      fetchMovies()
    } catch (error) {
      console.error("Error deleting movie:", error.message)
    }
  }

  // Load movie data into form for editing
  const handleEdit = (movie) => {
    setUpdateId(movie._id)
    setTitle(movie.title)
    setDesc(movie.desc)
  }

  return (
    <div className="App">
      <h1>🎬 Movie List</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id} style={{ marginBottom: "10px" }}>
            <strong>{movie.title}</strong>: {movie.desc}{" "}
            <button onClick={() => handleEdit(movie)}>Edit</button>{" "}
            <button onClick={() => handleDelete(movie._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>{updateId ? "Update Movie" : "Add Movie"}</h2>
      <form onSubmit={updateId ? handleUpdate : handleAdd}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />
        <button type="submit">{updateId ? "Update" : "Add"}</button>
        {updateId && (
          <button
            type="button"
            onClick={() => {
              setUpdateId(null)
              setTitle("")
              setDesc("")
            }}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  )
}

export default App
