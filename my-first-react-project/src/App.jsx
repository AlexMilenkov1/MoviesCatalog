import React, { useState, useEffect } from 'react'
import Search from './components/search.jsx'
import Spinner from './components/spinner.jsx'

const API_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY


const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchMovies = async () => {
    setLoading(true);

    try {
      const endpoint = `${API_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;

      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error('Network response was not ok')
      };

      const data = await response.json();

      if (data.Response === 'False') {
        throw new Error(data.Error || 'Failed to fetch movies');
        setMovies([]);
        return
      }

      setMovies(data.results || [])


    } catch (error) {
      console.log('Error fetching movies:', error);
      setError('Failed to load movies. Please try again later.')

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, [])

  return (
    <main className="relative min-h-screen w-full overflow-hidden">

      <div className='pattern' />
      <div className='wrapper'>
        <header>
          <img src="./public/images/hero.png" alt="hero background" />
          <h1>Find <span className='text-gradient'>Movies</span> You'll enjoy Without the Hassle</h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <div className='all-movies'>
          <h2 className='mt-[2em]'>All Movies</h2>

          {loading ? (
            <Spinner />
          ) : error ? (
            <p className='text-red-500'>{error}</p>
          ) : (
            <ul>
              {movies.map((movie) => (
                <p className='text-white' key={movie.id}>{movie.title}</p>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  )
}

export default App