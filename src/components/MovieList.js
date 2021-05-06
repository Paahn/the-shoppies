import React from 'react';
import '../styles/movielist.css';

const MovieList = ({ movies, nominateComponent, handleNominations, nominatedID, isResultsList }) => {
    const NominateComponent = nominateComponent;
    return (
        <div>
            {movies.map((movie) => 
            <div className='movie' key={movie.imdbID}>
                <img src={movie.Poster} alt='movie'></img>
                <p>{movie.Title}</p>
                <p>{movie.Year}</p>
                <div onClick={() => handleNominations(movie)}>
                    {nominatedID.includes(movie.imdbID) && nominatedID.length <= 5 && isResultsList ? (<div>Nominated!</div>) : (<NominateComponent />)}
                </div>
            </div>
            )}
        </div>
    )
}

export default MovieList
