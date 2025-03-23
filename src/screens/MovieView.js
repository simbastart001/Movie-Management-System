import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './MovieView.css';

export default function MovieView() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { imdbId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8081/api/v1/movies/${imdbId}`);
        setMovie(response.data);
      } catch (err) {
        console.error("Error fetching movie details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [imdbId]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading movie details...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="error-container">
        <h2>Movie not found</h2>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    );
  }

  // Extract the first backdrop image or use a placeholder
  const backdropImage = movie.backdrops && movie.backdrops.length > 0 
    ? movie.backdrops[0] 
    : 'https://via.placeholder.com/1200x400?text=No+Image+Available';

  return (
    <div className="movie-view-container">
      <div 
        className="movie-banner" 
        style={{ backgroundImage: `url(${backdropImage})` }}
      >
        <div className="banner-content">
          <h1>{movie.title}</h1>
          <p>Released: {movie.releaseDate}</p>
        </div>
      </div>

      <div className="movie-content">
        <div className="movie-info-container">
          <div className="movie-poster">
            <img 
              src={movie.poster || 'https://via.placeholder.com/300x450?text=No+Poster'} 
              alt={`${movie.title} poster`} 
            />
          </div>
          
          <div className="movie-details">
            <h2>{movie.title}</h2>
            <p><strong>Release Date:</strong> {movie.releaseDate}</p>
            <p><strong>IMDB ID:</strong> {movie.imdbId}</p>
            
            <div className="genres">
              <strong>Genres:</strong>
              <div className="genre-tags">
                {movie.genres && movie.genres.map((genre, index) => (
                  <span key={index} className="genre-tag">{genre}</span>
                ))}
              </div>
            </div>
            
            <div className="trailer-section">
              <strong>Trailer:</strong>
              {movie.trailerLink ? (
                <a 
                  href={movie.trailerLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-danger trailer-btn"
                >
                  <i className="fa fa-play-circle"></i> Watch Trailer
                </a>
              ) : (
                <p>No trailer available</p>
              )}
            </div>
            
            <div className="reviews-section">
              <h3>Reviews</h3>
              {movie.reviewIds && movie.reviewIds.length > 0 ? (
                <div className="review-list">
                  {movie.reviewIds.map((review, index) => (
                    <div key={index} className="review-card">
                      <p>{review.body}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No reviews yet</p>
              )}
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
          {/* <Link 
            to={`/editmovie/${movie.imdbId}`} 
            className="btn btn-outline-primary"
          >
            Edit Movie
          </Link> */}
        </div>
      </div>
    </div>
  );
}
