import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie, isLoggedIn, isFavorite, onToggleFavorite }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/watch/${movie.imdbID}`, { state: { movie } });
  };

  const handleStarClick = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      alert('Please login to add favorites');
      return;
    }
    onToggleFavorite(movie.imdbID);
  };

  return (
    <div 
      className="movie-card"
      onClick={handleCardClick}
      style={{
        position: 'relative',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        cursor: 'pointer',
        transition: 'transform 0.3s ease'
      }}
    >
      {/* Favorite Star  */}
      <div 
        className={`favorite-star ${isFavorite ? 'active' : ''}`}
        onClick={handleStarClick}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: '10',
          cursor: 'pointer',
          fontSize: '24px',
          backgroundColor: 'rgba(0,0,0,0.5)',
          width: '30px',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          transition: 'all 0.3s ease'
        }}
      >
        {isFavorite ? '★' : '☆'}
      </div>

      {/* Movie Poster */}
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder-movie.jpg"} 
        alt={movie.Title}
        style={{
          width: '100%',
          height: '300px',
          objectFit: 'cover'
        }}
      />

      {/* Movie Info */}
      <div style={{
        padding: '10px',
        backgroundColor: '#1f2123'
      }}>
        <h3 style={{
          margin: '0',
          color: '#f9d3b4',
          fontSize: '16px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>{movie.Title}</h3>
        <p style={{
          margin: '5px 0 0',
          color: '#aaa',
          fontSize: '14px'
        }}>{movie.Year} • {movie.Type}</p>
      </div>
    </div>
  );
};

export default MovieCard;