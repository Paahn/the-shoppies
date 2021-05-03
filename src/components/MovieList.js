import React from 'react';
import '../styles/movielist.css';

const MovieList = ({ movies }) => {
    return (
        <div>
            {movies.map((movie) => 
            <div className='movie' key={movie.imdbID}>
                <img src={movie.Poster} alt='movie'></img>
                <p>{movie.Title}</p>
                <p>{movie.Year}</p>
            </div>
            )}
        </div>
    )
}

export default MovieList
