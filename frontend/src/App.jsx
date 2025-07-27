import { useState, useEffect } from "react"
import axios from "axios"

function App() {
  // State to store all movies
  const [movies, setMovies] = useState([])

  // Form fields
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")

  // Track if we're updating a movie (null means we’re adding)
  const [updateId, setUpdateId] = useState(null)

  // ✅ Function to fetch all movies from backend
  const fetchMovies = async () => {
    try {
      const res = await axios.get("http://localhost:8000/movies")
      setMovies(res.data) // set fetched data to movies array
    } catch (error) {
      console.error("Error fetching movies:", error.message)
    }
  }

  // 🌀 Fetch all movies when component loads once
  useEffect(() => {
    fetchMovies()
  }, [])

  // ✅ Add new movie (POST request)
  const handleAdd = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:8000/movies", { title, desc })
      setTitle("")
      setDesc("")
      fetchMovies() // refresh list
    } catch (error) {
      console.error("Error adding movie:", error.message)
    }
  }

  // ✅ Update existing movie (PUT request)
  const handleUpdate = async (e) => {
    e.preventDefault()
    if (!updateId) return alert("Select a movie to update")
    try {
      await axios.put(`http://localhost:8000/movies/${updateId}`, {
        title,
        desc,
      })
      setTitle("")
      setDesc("")
      setUpdateId(null) // reset form mode
      fetchMovies()
    } catch (error) {
      console.error("Error updating movie:", error.message)
    }
  }

  // ✅ Delete a movie (DELETE request)
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/movies/${id}`)
      // If we were editing the same movie that got deleted, reset form
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

  // ✅ Fill form with existing movie data for editing
  const handleEdit = (movie) => {
    setUpdateId(movie._id)
    setTitle(movie.title)
    setDesc(movie.desc)
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 flex flex-col items-center p-6 font-sans text-gray-900">
      {/* Title */}
      <h1 className="text-4xl font-extrabold mb-8 text-white drop-shadow-lg">
        🎬 Movie List
      </h1>

      {/* List of Movies */}
      <ul className="w-full max-w-xl mb-8 space-y-4">
        {movies.map((movie) => (
          <li
            key={movie._id}
            className="bg-white bg-opacity-80 rounded-lg p-4 flex justify-between items-center shadow-lg hover:shadow-xl transition-shadow"
          >
            <div>
              <h2 className="text-xl font-semibold">{movie.title}</h2>
              <p className="text-gray-700">{movie.desc}</p>
            </div>
            {/* Edit & Delete Buttons */}
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(movie)}
                className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-500 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(movie._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Add/Update Form */}
      <div className="w-full max-w-xl bg-white bg-opacity-90 rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          {updateId ? "Update Movie" : "Add Movie"}
        </h2>
        <form
          onSubmit={updateId ? handleUpdate : handleAdd}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="text"
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          {/* Buttons */}
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-grow bg-purple-600 text-white font-semibold py-2 rounded-md hover:bg-purple-700 transition"
            >
              {updateId ? "Update" : "Add"}
            </button>
            {/* Show cancel only if editing */}
            {updateId && (
              <button
                type="button"
                onClick={() => {
                  setUpdateId(null)
                  setTitle("")
                  setDesc("")
                }}
                className="flex-grow bg-gray-400 text-gray-900 font-semibold py-2 rounded-md hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default App
