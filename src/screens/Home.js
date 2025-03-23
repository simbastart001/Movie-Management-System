import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8081/api/v1/movies");
      setMovies(response.data);
    } catch(err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const deleteMovie = async (imdbId) => {
    // Show confirmation dialog
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        // Here you would typically make a DELETE request to your backend
        // Since your backend code snippet doesn't include a delete endpoint,
        // you'll need to add one to your backend controller
        
        await axios.delete(`http://localhost:8081/api/v1/movies/${imdbId}`);
        
        // After successful deletion, update the UI by removing the movie
        setMovies(movies.filter(movie => movie.imdbId !== imdbId));
        
        // Show success message (optional)
        alert("Movie deleted successfully");
      } catch (err) {
        console.error("Error deleting movie:", err);
        alert("Failed to delete the movie. Please try again.");
      }
    }
  }

  if (loading) {
    return (
      <div className="container d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className='container'>
      <div className='py-4'>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Movies Collection</h2>
          {/* You can add an "Add Movie" button here later */}
        </div>

        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Release Date</th>
              <th scope="col">Trailer</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies && movies.length > 0 ? (
              movies.map((movie, index) => (
                <tr key={index}>
                  <th scope="row">{index+1}</th>
                  <td>{movie.title}</td>
                  <td>{movie.releaseDate}</td>
                  <td>
                    <a 
                      href={movie.trailerLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {movie.trailerLink ? "Watch Trailer" : "No Trailer"}
                    </a>
                  </td>
                  <td>
                    <Link 
                      className="btn btn-primary mx-2"
                      to={`/viewmovie/${movie.imdbId}`}
                    >
                      View
                    </Link>
                    {/* <Link 
                      className="btn btn-outline-primary mx-2"
                      to={`/editmovie/${movie.imdbId}`}
                    >
                      Edit
                    </Link> */}
                    <button 
                      className="btn btn-danger mx-2"
                      onClick={() => deleteMovie(movie.imdbId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No movies found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}