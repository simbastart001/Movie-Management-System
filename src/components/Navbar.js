import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, Form, FormControl, Button, Dropdown } from 'react-bootstrap';

export default function MovieNavbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Clear search when navigating to a different page
  useEffect(() => {
    setSearchTerm('');
    setShowDropdown(false);
  }, [location.pathname]);

  // Handle real-time search as user types
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim().length > 0) {
        searchMovies(searchTerm);
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    }, 300); // 300ms delay to avoid too many requests

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const searchMovies = async (query) => {
    if (!query.trim()) return;
    
    try {
      const response = await axios.get("http://localhost:8081/api/v1/movies");
      
      // Filter movies that match the query in title
      const filteredMovies = response.data.filter(movie => 
        movie.title.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5); // Limit to 5 results for dropdown
      
      setSearchResults(filteredMovies);
      setShowDropdown(filteredMovies.length > 0);
    } catch (err) {
      console.error("Error searching movies:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setShowDropdown(false);
    }
  };

  const handleResultClick = (movieId) => {
    navigate(`/viewmovie/${movieId}`);
    setShowDropdown(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <i className="fas fa-film me-2"></i>
          MovieVault
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
          </Nav>
          <Form className="d-flex position-relative" onSubmit={handleSubmit}>
            <FormControl
              type="search"
              placeholder="Search movies..."
              className="me-2"
              value={searchTerm}
              onChange={handleSearchChange}
              aria-label="Search"
              autoComplete="off"
            />
            <Button variant="outline-light" type="submit">
              <i className="fas fa-search"></i>
            </Button>
            
            {/* Real-time search results dropdown */}
            {showDropdown && (
              <div 
                className="position-absolute bg-white rounded shadow-sm w-100 mt-1" 
                style={{ top: '100%', zIndex: 1000 }}
              >
                {searchResults.map(movie => (
                  <div 
                    key={movie.imdbId} 
                    className="p-2 border-bottom d-flex align-items-center cursor-pointer"
                    onClick={() => handleResultClick(movie.imdbId)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img 
                      src={movie.poster || 'https://via.placeholder.com/50x75?text=No+Poster'} 
                      alt={`${movie.title} poster`}
                      style={{ width: '50px', height: '75px', objectFit: 'cover', marginRight: '10px' }}
                    />
                    <div>
                      <div className="fw-bold text-dark">{movie.title}</div>
                      <small className="text-secondary">{movie.releaseDate}</small>
                    </div>
                  </div>
                ))}
                <div className="p-2 text-center border-top">
                  <Button 
                    variant="link" 
                    className="text-primary p-0" 
                    onClick={handleSubmit}
                  >
                    View all results
                  </Button>
                </div>
              </div>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
