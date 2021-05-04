import React from 'react';
import TextField from '@material-ui/core/TextField';

const Search = ({ inputMovies, setInputMovies }) => {
    const searchMovies = (event) => {
        setInputMovies(event.target.value);
    }
    return (
        <div>
            <TextField
                id='outlined-search'
                label='Search movies'
                type='search'
                variant='outlined'
                value={inputMovies}
                onChange={searchMovies}
            />
        </div>
    )
}

export default Search
