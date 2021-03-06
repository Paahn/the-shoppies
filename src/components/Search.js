import React from 'react';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import '../styles/search.css';

const Search = ({ inputMovies, setInputMovies }) => {
    const searchMovies = (event) => {
        setInputMovies(event.target.value);
    }
    return (
        <div>
            <TextField
              className='search-bar'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
                id='outlined-search'
                type='search'
                variant='outlined'
                value={inputMovies}
                onChange={searchMovies}
                placeholder='Search movies'
            />
        </div>
    )
}

export default Search
