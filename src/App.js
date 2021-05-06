import React, { useState, useEffect } from 'react';
import AddNomination from './components/AddNomination';
import MovieList from './components/MovieList';
import Nominated from './components/Nominated';
import RemoveNomination from './components/RemoveNomination';
import Search from './components/Search';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [inputMovies, setInputMovies] = useState('');
  const [nominations, setNominations] = useState([]);
  const [nominatedID, setNominatedID] = useState([]);

  const addNomination = (movie) => {
    const movieNominationIDs = nominations.map(nom => nom.imdbID);
    const idExists = movieNominationIDs.includes(movie.imdbID);

    if (!idExists && nominations.length < 5){
      const newNominationList = [...nominations, movie];
      setNominations(newNominationList);
      saveToLocalStorage(newNominationList);
      const newNominatedList = [...nominatedID, movie.imdbID];
      setNominatedID(newNominatedList);
    }
  }

  const removeNomination = (movie) => {
    const newNominationsList = nominations.filter(
      (nomination) => nomination.imdbID !== movie.imdbID
    );
    setNominations(newNominationsList);
    saveToLocalStorage(newNominationsList);
    const movieNominationIDs = nominations.map(nom => nom.imdbID);
    setNominatedID(movieNominationIDs);
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

  useEffect(() => {
    const movieNominations = JSON.parse(
      localStorage.getItem('movie-nominations')
    );
    if (movieNominations) {
      setNominations(movieNominations);
    }
  }, [])

  useEffect(() => {
    const movieNominations = JSON.parse(
      localStorage.getItem('movie-nominations')
    );
    if (movieNominations) {
      const movieNominationIDs = movieNominations.map(nom => nom.imdbID);
      setNominatedID(movieNominationIDs);
    }
  }, [])

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
        nominatedID={nominatedID}
        isResultsList
        nominatedComponent={Nominated}
      />
      {nominations.length === 5 ? <div>Nominations completed! If you would like to alter your nominations, then please remove a nomination first. </div> : <></>}
      <MovieList
        movies={nominations}
        nominateComponent={RemoveNomination}
        handleNominations={removeNomination}
        nominatedID={nominatedID}
        nominatedComponent={Nominated}
      />
    </div>
  )
}

export default App
