import React, { useState, useEffect } from 'react';
import AddNomination from './components/AddNomination';
import MovieList from './components/MovieList';
import Nominated from './components/Nominated';
import RemoveNomination from './components/RemoveNomination';
import Search from './components/Search';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';
import '../src/app.css';
import useDebounce from './utils/debounceHook';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [inputMovies, setInputMovies] = useState('');
  const [nominations, setNominations] = useState([]);
  const [nominatedID, setNominatedID] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchErrors, setSearchErrors] = useState({ 
    errors: false,
    message: ''
  })

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
    const movieNominationIDs = newNominationsList.map(nom => nom.imdbID);
    setNominatedID(movieNominationIDs);
  }

  const getMovies = async () => {
    const url = `https://www.omdbapi.com/?s=${inputMovies}&apikey=${process.env.REACT_APP_API_KEY}`;
    await fetch(url)
    .then ((response) => response.json())
    .then ((data) => {
      if (data.Search) {
        const moviesOnly = data.Search.filter(movie => movie.Type === "movie");
        setIsSearching(false);
        setSearchErrors({errors: false, message: ''});
        setMovies(moviesOnly);
      }
      if (data.Error) {
        setIsSearching(false);
        setSearchErrors({errors: true, message: `${data.Error}`});
        setMovies([]);
      }
    })
  };

  const saveToLocalStorage = (items) => {
    localStorage.setItem('movie-nominations', JSON.stringify(items));
  }
  
  const debouncedSearchMovies = useDebounce(inputMovies, 500);

  useEffect(() => {
    if (debouncedSearchMovies) {
      setIsSearching(true);
      getMovies();
    } else {
      setIsSearching(false);
      setSearchErrors({errors: false, message: ''});
      setMovies([]);
    }
  }, [debouncedSearchMovies]);

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
      <Card>
      <CardContent>
        <Search
          inputMovies={inputMovies}
          setInputMovies={setInputMovies}
        />
      </CardContent>
      </Card>
      {isSearching && <div>Searching ...</div>}
      {searchErrors.errors ? <div>{searchErrors.message}</div> : null}
      <div className='movies-display'>
        <Card>
          <CardContent>
            <MovieList 
              movies={movies}
              nominateComponent={AddNomination}
              handleNominations={addNomination}
              nominatedID={nominatedID}
              isResultsList
              nominatedComponent={Nominated}
            />
          </CardContent>
        </Card>
        {nominations.length === 5 ? <div>Nominations completed! If you would like to alter your nominations, then please remove a nomination first. </div> : <></>}
        <Card>
          <CardContent>
            <MovieList
              movies={nominations}
              nominateComponent={RemoveNomination}
              handleNominations={removeNomination}
              nominatedID={nominatedID}
              nominatedComponent={Nominated}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App
