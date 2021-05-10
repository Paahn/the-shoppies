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
import logo from '../src/shoppies-logo.png';
import Banner from './components/Banner';
import Searching from './components/Searching';


const App = () => {
  const [movies, setMovies] = useState([]);
  const [inputMovies, setInputMovies] = useState('');
  const [nominations, setNominations] = useState([]);
  const [nominatedID, setNominatedID] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchErrors, setSearchErrors] = useState({ 
    errors: false,
    message: ''
  });

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
        const moviesOnly = data.Search.filter(movie => movie.Type === 'movie');
        setIsSearching(false);
        setSearchErrors({errors: false, message: ''});
        setMovies(moviesOnly);
        console.log(moviesOnly.length, ' results found');
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
      <div className='top'><img src={logo} width='auto' height='auto' className='logo' alt='logo'/><h2><i>The Shoppies</i></h2></div>
      {
      nominations.length === 5 
      ? <Banner /> 
      : <Card className='app-description slide-in'>
          <CardContent>
            <p><h3><strong>Nominate your 5 favourite movies for the prestigious</strong></h3></p> 
            <p><h2><strong>Shoppies Awards!</strong></h2></p>
          </CardContent>
        </Card>
      }
      <Card className='searchbar'>
      <CardContent>
        <Search
          inputMovies={inputMovies}
          setInputMovies={setInputMovies}
        />
      </CardContent>
      </Card>
      <div className='movies-display'>
        <Card className='search-results'>
          <CardContent>
            <div className='search-results-top'>
              {isSearching && <Searching />}
              {searchErrors.errors ? <div>{searchErrors.message}</div> : null}
              {inputMovies !== '' ? (
                <p className='search-results-description'>Your search for {inputMovies} returned {movies.length} movies.</p>
                ) : <p className='search-results-description'>Movie search results will appear here</p>}
            </div>
          </CardContent>
          <CardContent className='search-results'>
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
        <Card className='nominations-card'>
          <CardContent>
          {nominations.length === 0 ? (
            <p className='search-results-description'>Nominations will appear here</p>
          ) : <></> }
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
