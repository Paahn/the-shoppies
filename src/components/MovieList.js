import React from 'react';
import '../styles/movielist.css';
import defaultPoster from '../default_poster.jpeg';

const MovieList = ({ movies, nominateComponent, handleNominations, nominatedID, isResultsList, nominatedComponent }) => {
    const NominateComponent = nominateComponent;
    const NominatedComponent = nominatedComponent;
    return (
        <div>
            {movies.map((movie) => 
            <div className='movie' key={movie.imdbID}>
                <img src={movie.Poster === 'N/A' ? defaultPoster : movie.Poster} alt='movie'></img>
                <p className='movie-title'>{movie.Title}</p>
                <p>{movie.Year}</p>
                <div className={`nomination-button-container ${nominatedID.length < 5 ? 'nomination-available' : ''} ${nominatedID.length === 5 && isResultsList ? 'nomination-unavailable' : ''}`} onClick={() => handleNominations(movie)}>
                    {nominatedID.includes(movie.imdbID) && nominatedID.length <= 5 && isResultsList ? (<NominatedComponent />) : (<NominateComponent active={`${nominatedID.length < 5 ? true : false}`} inactive={`${nominatedID.length === 5 ? true : false }`} />)}
                </div>
            </div>
            )}
        </div>
    )
}

export default MovieList
