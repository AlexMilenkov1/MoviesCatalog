import React, { useState, useEffect } from 'react'
import Search from './components/search.jsx'
import Spinner from './components/spinner.jsx'
import MovieCard from './components/movieCard.jsx'
import {useDebounce} from 'react-use'
import {updateSearchCount, getTrendingMovies} from '/src/appwrite.js'

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;


const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([])
  const [loading, setLoading] = useState(true);
  const [debounceSearchTerm, setDebounceSearchTerm] = useState('');
  
  useDebounce(() => {
    setDebounceSearchTerm(searchTerm)}
    ,700
    ,[searchTerm]
  )

  const fetchMovies = async (query = '') => {
    setLoading(true);

    try {
      const endpoint = query
        ? `${API_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}`
        : `${API_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`


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

      if (query || data.results.length > 0) {
        updateSearchCount(query, data.results[0]);
      }
      


    } catch (error) {
      console.log('Error fetching movies:', error);
      setError('Failed to load movies. Please try again later.')

    } finally {
      setLoading(false);
    }
  }

  
  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();

      setTrendingMovies(movies)
    } catch (error) {
      console.log('Error fetching trending movies:', error);
    }
  }

  useEffect(() => {
    fetchMovies(debounceSearchTerm);
  }, [debounceSearchTerm])

  useEffect(() => {
    loadTrendingMovies();
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
        
        
        {trendingMovies.length > 0 && (
          <section className='trending'>
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} />
                </li>

              ))}
            </ul>
          </section>
        )}

        <div className='all-movies'>
          <h2>All Movies</h2>

          {loading ? (
            <Spinner />
          ) : error ? (
            <p className='text-red-500'>{error}</p>
          ) : (
            <ul>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  )
}

export default App