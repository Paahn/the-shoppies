import React from 'react';
import '../styles/movielist.css';
import Nominated from './Nominated';

const MovieList = ({ movies, nominateComponent, handleNominations, nominatedID, isResultsList, nominatedComponent }) => {
    const NominateComponent = nominateComponent;
    const NominatedComponent = nominatedComponent;
    return (
        <div>
            {movies.map((movie) => 
            <div className='movie' key={movie.imdbID}>
                <img src={movie.Poster} alt='movie'></img>
                <p>{movie.Title}</p>
                <p>{movie.Year}</p>
                <div onClick={() => handleNominations(movie)}>
                    {nominatedID.includes(movie.imdbID) && nominatedID.length <= 5 && isResultsList ? (<Nominated />) : (<NominateComponent />)}
                </div>
            </div>
            )}
        </div>
    )
}

export default MovieList
