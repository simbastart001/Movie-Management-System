import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './SearchResults.css';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchMovies = async () => {
      if (!query) {
        setMovies([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Get all movies and filter on the client side
        // In a real application, you'd want a dedicated search endpoint on your backend
        const response = await axios.get("http://localhost:8081/api/v1/movies");
        
        // Filter movies that match the query in title
        const filteredMovies = response.data.filter(movie => 
          movie.title.toLowerCase().includes(query.toLowerCase())
        );
        
        setMovies(filteredMovies);
      } catch (err) {
        console.error("Error searching movies:", err);
      } finally {
        setLoading(false);
      }
    };

    searchMovies();
  }, [query]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Searching movies...</p>
      </div>
    );
  }

  return (
    <div className="search-results-container">
      <div className="search-header">
        <h2>Search Results for: "{query}"</h2>
        <p>{movies.length} movies found</p>
      </div>

      {movies.length > 0 ? (
        <div className="movie-grid">
          {movies.map((movie) => (
            <div key={movie.imdbId} className="movie-card">
              <div className="movie-poster">
                <img 
                  src={movie.poster || 'https://via.placeholder.com/300x450?text=No+Poster'} 
                  alt={`${movie.title} poster`} 
                />
              </div>
              <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <p className="movie-release-date">{movie.releaseDate}</p>
                <div className="movie-card-actions">
                  <Link to={`/viewmovie/${movie.imdbId}`} className="view-button">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>No movies found matching "{query}"</p>
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
      )}
    </div>
  );
}