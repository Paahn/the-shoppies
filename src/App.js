import React, { useState, useEffect } from 'react';
import AddNomination from './components/AddNomination';
import MovieList from './components/MovieList';
import Search from './components/Search';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [inputMovies, setInputMovies] = useState('');

  const getMovies = async () => {
    const url = `https://www.omdbapi.com/?s=${inputMovies}&apikey=${process.env.REACT_APP_API_KEY}`;
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
  }, [inputMovies]);

  return (
    <div>
      <Search
        inputMovies={inputMovies}
        setInputMovies={setInputMovies}
      />
      <MovieList 
        movies={movies}
        nominateComponent={AddNomination}
      />
    </div>
  )
}

export default App
