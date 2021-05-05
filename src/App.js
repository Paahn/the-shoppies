import React, { useState, useEffect } from 'react';
import AddNomination from './components/AddNomination';
import MovieList from './components/MovieList';
import RemoveNomination from './components/RemoveNomination';
import Search from './components/Search';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [inputMovies, setInputMovies] = useState('');
  const [nominations, setNominations] = useState([]);

  const addNomination = (movie) => {
    const newNominationList = [...nominations, movie];
    setNominations(newNominationList);
    saveToLocalStorage(newNominationList);
  }

  const removeNomination = (movie) => {
    const newNominationsList = nominations.filter(
      (nomination) => nomination.imdbID !== movie.imdbID
    );
    setNominations(newNominationsList);
    saveToLocalStorage(newNominationsList);
  }

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

  const saveToLocalStorage = (items) => {
    localStorage.setItem('movie-nominations', JSON.stringify(items));
  }
  
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
        handleNominations={addNomination}
      />
      <MovieList
        movies={nominations}
        nominateComponent={RemoveNomination}
        handleNominations={removeNomination}
      />
    </div>
  )
}

export default App
