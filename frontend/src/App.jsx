import { useState, useEffect } from "react"
import axios from "axios"
import "./App.css"

function App() {
  const [movies, setMovies] = useState([]) // should be array, not 0

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get("http://localhost:8000/movies")
        setMovies(res.data)
      } catch (error) {
        console.error("Error fetching movies:", error.message)
      }
    }

    fetchMovies()
  }, [])

  return (
    <>
      <h1>🎬 Movie List</h1>
      <ul>
        {movies.map((data, index) => (
          <li key={index}>
            <strong>{data.title}</strong>: {data.desc}
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
