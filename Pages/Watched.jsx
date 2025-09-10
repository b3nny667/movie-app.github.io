import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaClock, FaFilm, FaTv } from 'react-icons/fa';
import '../css/Watched.css';

const Watched = ({ isLoggedIn, watchedItems }) => {
  const navigate = useNavigate();

  const sortedWatchedItems = [...watchedItems]
    .filter(item => item?.progress > 0)
    .sort((a, b) => new Date(b.lastWatched) - new Date(a.lastWatched));

  if (!isLoggedIn) {
    return (
      <div className="empty">
        <h2>Please log in to view watched history</h2>
        <button onClick={() => navigate('/sign')} className="home-button">
          Sign In
        </button>
      </div>
    );
  }

  if (sortedWatchedItems.length === 0) {
    return (
      <div className="empty">
        <h2>No watched items yet</h2>
        <p>Watch at least 10% of a movie or show to see it here</p>
        <button onClick={() => navigate('/')} className="home-button">
          Browse Content
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="watched-header">
        <h1>Your Watched History</h1>
        <p className="subtitle">Continue where you left off</p>
      </div>
      
      <div className="watched-container">
        {sortedWatchedItems.map((item) => (
          <div key={item.id} className="watched-card">
            <div className="poster-container">
              <Link to={`/watch/${item.id}`}>
                <img 
                  src={item.poster} 
                  alt={item.title}
                  className="watched-poster"
                  onError={(e) => {
                    e.target.src = '/placeholder-movie.jpg';
                  }}
                />
              </Link>
              <div className="progress-badge">
                {item.progress >= 90 ? (
                  <span>✓ Completed</span>
                ) : item.type === 'movie' ? (
                  <>
                    <FaClock className="progress-icon" />
                    <span>{Math.round(item.minutesLeft)} min left</span>
                  </>
                ) : (
                  <>
                    <FaTv className="progress-icon" />
                    <span>S{item.season || 1} E{item.episode || 1}</span>
                  </>
                )}
              </div>
            </div>
            
            <div className="watched-info">
              <h3>{item.title}</h3>
              <p className="watched-meta">
                <span>Last watched: {new Date(item.lastWatched).toLocaleDateString()}</span>
                <span className="media-type">
                  {item.type === 'movie' ? <FaFilm /> : <FaTv />}
                  {item.type}
                </span>
              </p>
              <p className="progress-text">Watched: {Math.round(item.progress)}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watched;