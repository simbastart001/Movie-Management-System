import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import MovieView from './screens/MovieView';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/viewmovie/:imdbId" element={<MovieView />} />
          {/* You can add other routes here later */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;