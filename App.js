import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './Pages/Home';
import Sign from './Pages/Sign';
import Register from './Pages/Register';
import Favorites from './components/Favorites';
import WatchNow from './Pages/WatchNow';
import Watched from './Pages/Watched';
import './App.css';
import './css/Watched.css';
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [watchedItems, setWatchedItems] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : true;
  });
  const navigate = useNavigate();

  
  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'dark' : 'light'
    );
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (email, redirectPath = '/') => {
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify({ email }));
    navigate(redirectPath);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    navigate('/');
  };

  const toggleFavorite = (movieId) => {
    setFavorites(prev => 
      prev.includes(movieId)
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
    );
  };

  const updateWatched = (movieId, itemData) => {
    setWatchedItems(prev => {
      const existingIndex = prev.findIndex(item => item.id === movieId);
      const newItem = {
        id: movieId,
        lastWatched: new Date().toISOString(),
        ...itemData
      };

      if (existingIndex >= 0) {
        return [
          newItem,
          ...prev.slice(0, existingIndex),
          ...prev.slice(existingIndex + 1)
        ];
      }
      return [newItem, ...prev];
    });
  };

  return (
    <div className="app">
      <Nav 
        isLoggedIn={isLoggedIn} 
        onLogout={handleLogout}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      
      <Routes>
        <Route path="/" element={
          <Home 
            isLoggedIn={isLoggedIn}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            updateAllMovies={setAllMovies}
          />
        } />
        <Route path="/home" element={
          <Home 
            isLoggedIn={isLoggedIn}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            updateAllMovies={setAllMovies}
          />
        } />
        <Route path="/sign" element={
          <Sign onLogin={handleLogin} />
        } />
        <Route path="/register" element={
          <Register />
        } />
        <Route path="/favorites" element={
          <Favorites 
            isLoggedIn={isLoggedIn}
            favorites={favorites}
            movies={allMovies}
            onToggleFavorite={toggleFavorite}
          />
        } />
        <Route path="/watched" element={
          <Watched 
            isLoggedIn={isLoggedIn}
            watchedItems={watchedItems}
          />
        } />
        <Route path="/watch/:id" element={
          <WatchNow 
            isLoggedIn={isLoggedIn}
            updateWatched={updateWatched}
          />
        } />
      </Routes>
    </div>
  );
}

export default AppWrapper;