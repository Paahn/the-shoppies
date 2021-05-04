import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';

const App = () => {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const url = `https://www.omdbapi.com/?s=star wars&apikey=${process.env.REACT_APP_API_KEY}`;
    await fetch(url)
    .then ((response) => response.json())
    .then ((data) => {
      if (data.Search) {
        const moviesOnly = data.Search.filter(movie => movie.Type === "movie");
        setMovies(moviesOnly);
      }
    })
  };
  
  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      <MovieList movies={movies} />
    </div>
  )
}

export default App
