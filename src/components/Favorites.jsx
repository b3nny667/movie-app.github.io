import React from 'react';
import MovieCard from './MovieCard';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Favorites = ({ isLoggedIn, favorites, movies, onToggleFavorite }) => {
  const navigate = useNavigate();

  const favoriteMovies = movies.filter(movie => 
    movie && movie.imdbID && favorites.includes(movie.imdbID)
  );

  if (!isLoggedIn) {
    return (
      <div className="empty">
        <h2>Please log in to view favorites</h2>
        <button onClick={() => navigate('/sign')} className="home-button">
          Sign In
        </button>
      </div>
    );
  }

  if (favoriteMovies.length === 0) {
    return (
      <div className="empty">
        <h2>No favorites yet</h2>
        <p>Click the star icon on movies to add them to favorites</p>
        <button onClick={() => navigate('/')} className="home-button">
          Browse Movies
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Your Favorites</h1>
      <div className="container">
        {favoriteMovies.map((movie) => (
          <MovieCard 
            key={movie.imdbID} 
            movie={movie} 
            isLoggedIn={isLoggedIn}
            isFavorite={true}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;