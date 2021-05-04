import React from 'react';
import TextField from '@material-ui/core/TextField';

const Search = () => {
    return (
        <div>
            <TextField id="outlined-search" label="Search movies" type="search" variant="outlined" />
        </div>
    )
}

export default Search
