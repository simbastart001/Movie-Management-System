import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import MovieView from './screens/MovieView';
import SearchResults from './components/SearchResults';
import Navbar from './components/Navbar';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/viewmovie/:imdbId" element={<MovieView />} />
          <Route path="/search" element={<SearchResults />} />
          {/* You can add other routes here later */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;